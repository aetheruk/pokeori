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
import { TaskIconDisplay } from '@/components/game/shared/TaskIconDisplay'
import { CurrencySprite } from '@/components/ui/currency-sprite'
import { getCurrency } from '@/data/currencies'
import { getSkill } from '@/data/skills'
import { getIcon } from '@/data/user'
import { getPokemonImageUrl } from '@/utilities/pokemon/pokedex'
import { getPokemonRarityEffect } from '@/utilities/pokemon/rarity-effects'
import { RewardSummary } from '@/utilities/rewards/reward-logic'
import { cn } from '@/lib/utils'
import { ItemSprite } from '../ui/item-sprite'
import { SectionDivider } from '../ui/section-divider'
import { CardRewardCarousel } from './card-reward-carousel'

const BACKGROUND_REWARD_SPRITE = '/sprites/items/forest-photo.avif'
const TITLE_REWARD_SPRITE = '/sprites/items/certificate.avif'

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
  const hasRewards =
    xpEntries.length > 0 ||
    (summary.items || []).length > 0 ||
    (summary.pokemon || []).length > 0 ||
    (summary.sketchedMoves || []).length > 0 ||
    (summary.currency || []).length > 0 ||
    (summary.cards || []).length > 0 ||
    (summary.tasksCompleted || []).length > 0 ||
    (summary.banners || []).length > 0 ||
    (summary.icons || []).length > 0 ||
    (summary.titles || []).length > 0 ||
    (summary.upgrades || []).length > 0 ||
    (summary.notices || []).length > 0 ||
    (summary.researchXp || []).length > 0 ||
    (summary.researchBreakthroughs || []).length > 0 ||
    (summary.eggs || []).length > 0 ||
    !!summary.levelUp

  if (!hasRewards) return null

  return (
    <div className="space-y-6 p-4">
      <SectionDivider>{title}</SectionDivider>

      <div className="space-y-0">
        {/* Main Rewards Grid */}
        <div className="grid grid-cols-1">
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
                <div><p className="text-sm font-semibold text-game-ink">{egg.rarity === 'normal' ? 'Egg found' : `${rarity.label} Egg found`}</p><p className="text-xs text-game-muted">Ready to hatch in 12 hours</p></div>
              </RewardLedgerRow>
            )
          })}
          {/* XP */}
          {xpEntries.map(([skillId, amount]) => {
            const skill = getSkill(skillId)
            const label = skill?.name ? `${skill.name} Exp` : 'Experience'
            const iconId = skill?.iconId

            return (
              <RewardLedgerRow
                key={`xp-${skillId}`}
                className="p-2 bg-game-surface-raised border-game-border flex-row items-center gap-3 h-12"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center">
                  {iconId ? (
                    iconId.match(/\.(?:avif|png|webp|jpe?g)$/) ? (
                      <div className="w-5 h-5 relative">
                        <Image
                          src={`/fallback/skills/${iconId}`}
                          alt={label}
                          width={20}
                          height={20}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className="w-5 h-5 relative">
                        <ItemSprite
                          itemId={iconId}
                          alt={label}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )
                  ) : (
                    <Star className="w-4 h-4 text-game-moss-strong" />
                  )}
                </div>
                <div className="flex-1 flex items-center justify-between min-w-0 pr-2">
                  <span className="font-medium text-game-ink text-sm truncate">
                    {label}
                  </span>
                  <span className="font-bold text-game-moss-strong text-sm">
                    +{amount} XP
                  </span>
                </div>
              </RewardLedgerRow>
            )
          })}

          {/* Currency */}
          {(summary.currency || []).map((curr, i) => {
            const currencyDef = getCurrency(curr.type)
            return (
              <RewardLedgerRow
                key={`curr-${i}`}
                className="p-2 bg-game-surface-raised border-game-border flex-row items-center gap-3 h-12"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center text-game-ochre">
                  {currencyDef ? (
                    <CurrencySprite
                      currencyId={curr.type}
                      alt={currencyDef.name}
                      width={20}
                      height={20}
                      className="w-5 h-5 object-contain"
                    />
                  ) : (
                    <Coins className="w-4 h-4" />
                  )}
                </div>
                <div className="flex-1 flex items-center justify-between min-w-0 pr-2">
                  <span className="font-medium text-game-ink text-sm truncate">
                    {currencyDef ? currencyDef.name : curr.type}
                  </span>
                  <span
                    className={`font-bold text-sm ${
                      curr.quantity < 0 ? 'text-game-danger' : 'text-game-muted'
                    }`}
                  >
                    {curr.quantity > 0 ? `x${curr.quantity}` : curr.quantity}
                  </span>
                </div>
              </RewardLedgerRow>
            )
          })}

          {/* Notices */}
          {(summary.notices || []).map((notice, i) => {
            const showMessage =
              notice.id !== 'random-event-spawned' && Boolean(notice.message)

            return (
              <RewardLedgerRow
                key={`notice-${notice.id}-${i}`}
                className={`p-2 bg-game-surface-raised border-game-border flex-row items-center gap-3 ${
                  showMessage ? 'min-h-12' : 'h-12'
                }`}
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center text-game-ochre">
                  {notice.icon ? (
                    <TaskIconDisplay icon={notice.icon} className="h-6 w-6" />
                  ) : (
                    <Search className="w-4 h-4 text-game-ochre" />
                  )}
                </div>
                <div className="flex-1 min-w-0 pr-2 text-left">
                  <div className="font-medium text-game-ink text-sm truncate">
                    {notice.title}
                  </div>
                  {showMessage && (
                    <div className="text-xs text-game-muted truncate">
                      {notice.message}
                    </div>
                  )}
                </div>
              </RewardLedgerRow>
            )
          })}

          {/* Items */}
          {(summary.items || []).map((item, i) => {
            return (
              <RewardLedgerRow
                key={`item-${i}`}
                className="p-2 bg-game-surface-raised border-game-border flex-row items-center gap-3 h-12"
              >
                <div className="relative flex h-8 w-8 shrink-0 items-center justify-center">
                  <ItemSprite
                    itemId={item.id}
                    alt={item.name}
                    width={28}
                    height={28}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1 flex items-center justify-between min-w-0 pr-2">
                  <span className="font-medium text-game-ink text-sm truncate">
                    {item.name}
                  </span>
                  <span className="font-bold text-game-muted text-sm">
                    x{item.quantity}
                  </span>
                </div>
              </RewardLedgerRow>
            )
          })}

          {/* Cards */}
          {(summary.cards || []).length > 0 && (
            <CardRewardCarousel cards={summary.cards} />
          )}

          {/* Pokemon */}
          {(summary.pokemon || []).map((p, i) => (
            <RewardLedgerRow
              key={`poke-${i}`}
              className="p-2 bg-game-surface-raised border-game-border flex-row items-center gap-3 h-12"
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
              <div className="flex-1 flex items-center justify-between min-w-0 pr-2">
                <div className="flex items-center gap-2 truncate">
                  <span className="font-medium text-game-ink text-sm truncate">
                    {p.name}
                  </span>
                  {p.shiny && (
                    <span className="text-game-ochre text-xs">★</span>
                  )}
                </div>
                <span className="font-bold text-game-muted text-xs">
                  Lvl {p.level}
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
                <span className="truncate text-sm font-medium text-game-ink">{move.name}</span>
                <span className="text-xs font-bold text-game-ochre">Sketched</span>
              </div>
            </RewardLedgerRow>
          ))}

          {/* Tasks Completed */}
          {summary.tasksCompleted?.map((task, i) => (
            <RewardLedgerRow
              key={`task-${i}`}
              className="p-2 bg-game-surface-raised border-game-border flex-row items-center gap-3 h-12"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center text-game-moss-strong">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="flex-1 flex items-center justify-between min-w-0 pr-2">
                <span className="font-medium text-game-ink text-sm truncate">
                  {task.name}
                </span>
                <span className="font-bold text-game-moss-strong text-xs">
                  Completed
                </span>
              </div>
            </RewardLedgerRow>
          ))}

          {/* Banners */}
          {summary.banners?.map((banner, i) => (
            <RewardLedgerRow
              key={`banner-${i}`}
              className="p-2 bg-game-surface-raised border-game-border flex-row items-center gap-3 h-12"
            >
              <div className="relative flex h-8 w-8 shrink-0 items-center justify-center p-0.5">
                <Image
                  src={BACKGROUND_REWARD_SPRITE}
                  alt="Background award"
                  width={28}
                  height={28}
                  className="w-full h-full object-contain pixelated"
                />
              </div>
              <div className="flex-1 flex items-center justify-between min-w-0 pr-2">
                <span className="font-medium text-game-ink text-sm truncate">
                  Banner: {banner.name}
                </span>
                <span className="font-bold text-game-moss-strong text-xs">
                  Unlocked
                </span>
              </div>
            </RewardLedgerRow>
          ))}

          {/* Icons */}
          {summary.icons?.map((icon, i) => (
            <RewardLedgerRow
              key={`icon-${i}`}
              className="p-2 bg-game-surface-raised border-game-border flex-row items-center gap-3 h-12"
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
              <div className="flex-1 flex items-center justify-between min-w-0 pr-2">
                <span className="font-medium text-game-ink text-sm truncate">
                  Icon: {icon.name}
                </span>
                <span className="font-bold text-game-moss-strong text-xs">
                  Unlocked
                </span>
              </div>
            </RewardLedgerRow>
          ))}

          {/* Titles */}
          {summary.titles?.map((titleItem, i) => (
            <RewardLedgerRow
              key={`title-${i}`}
              className="p-2 bg-game-surface-raised border-game-border flex-row items-center gap-3 h-12"
            >
              <div className="relative flex h-8 w-8 shrink-0 items-center justify-center p-0.5">
                <Image
                  src={TITLE_REWARD_SPRITE}
                  alt="Title certificate"
                  width={28}
                  height={28}
                  className="w-full h-full object-contain pixelated"
                />
              </div>
              <div className="flex-1 flex items-center justify-between min-w-0 pr-2">
                <span className="font-medium text-game-ink text-sm truncate">
                  Title: {titleItem.name}
                </span>
                <span className="font-bold text-game-moss-strong text-xs">
                  Unlocked
                </span>
              </div>
            </RewardLedgerRow>
          ))}

          {/* Upgrades */}
          {summary.upgrades?.map((upgrade, i) => (
            <RewardLedgerRow
              key={`upgrade-${i}`}
              className="p-2 bg-game-surface-raised border-game-border flex-row items-center gap-3 h-12"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center text-game-moss-strong">
                <Package className="w-4 h-4" />
              </div>
              <div className="flex-1 flex items-center justify-between min-w-0 pr-2">
                <span className="font-medium text-game-ink text-sm truncate">
                  {upgrade.label}
                </span>
                <span className="font-bold text-game-moss-strong text-xs">
                  +{upgrade.value}
                </span>
              </div>
            </RewardLedgerRow>
          ))}

          {/* Research XP */}
          {(summary.researchXp || []).map((res, i) => (
            <RewardLedgerRow
              key={`research-xp-${i}`}
              className="h-12 flex-row items-center gap-2 border-game-border bg-game-surface-raised p-2 sm:gap-3"
            >
              <div className="relative flex h-8 w-8 shrink-0 items-center justify-center p-0.5">
                <Image
                  src={getPokemonImageUrl(res.formId, 'sprite')}
                  alt={res.formName}
                  width={28}
                  height={28}
                  className="w-full h-full object-contain pixelated"
                />
              </div>
              <div className="flex min-w-0 flex-1 items-center justify-between gap-2 sm:pr-2">
                <span className="truncate text-sm font-medium text-game-ink">
                  {res.formName} Research
                </span>
                <span className="shrink-0 whitespace-nowrap text-sm font-bold text-game-moss-strong">
                  +{res.amount} XP
                </span>
              </div>
            </RewardLedgerRow>
          ))}

          {/* Research Breakthroughs */}
          {(summary.researchBreakthroughs || []).map((b, i) => (
            <RewardLedgerRow
              key={`research-break-${i}`}
              className="p-2 bg-game-surface-raised border-game-moss/35 flex-row items-center gap-3 min-h-12"
            >
              <div className="relative flex h-8 w-8 shrink-0 items-center justify-center p-0.5">
                <Image
                  src={getPokemonImageUrl(b.formId, 'sprite')}
                  alt={b.pokemonName}
                  width={28}
                  height={28}
                  className="w-full h-full object-contain pixelated"
                />
              </div>
              <div className="flex min-w-0 flex-1 items-center justify-between gap-2 sm:pr-2">
                <span className="truncate text-sm font-medium text-game-ink">
                  {b.pokemonName} Research
                </span>
                <span className="shrink-0 whitespace-nowrap text-sm font-bold text-game-moss-strong">
                  LVL {b.newLevel}
                </span>
              </div>
            </RewardLedgerRow>
          ))}
          {/* Level Up */}
          {summary.levelUp &&
            (() => {
              const levelUp = summary.levelUp
              const skill = getSkill(levelUp.skillId)
              const iconId = skill?.iconId

              return (
                <RewardLedgerRow className="mt-2 flex-row">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center">
                    {iconId ? (
                      iconId.match(/\.(?:avif|png|webp|jpe?g)$/) ? (
                        <div className="w-5 h-5 relative">
                          <Image
                            src={`/fallback/skills/${iconId}`}
                            alt={skill?.name || 'Skill'}
                            width={20}
                            height={20}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      ) : (
                        <div className="w-5 h-5 relative">
                          <ItemSprite
                            itemId={iconId}
                            alt={skill?.name || 'Skill'}
                            width={20}
                            height={20}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      )
                    ) : (
                      <Star className="w-4 h-4 text-game-moss-strong animate-pulse" />
                    )}
                  </div>
                  <div className="flex-1 flex items-center justify-between min-w-0 pr-2">
                    <span className="font-medium text-game-ink text-sm truncate uppercase tracking-wide">
                      {skill?.name || 'New'} Level
                    </span>
                    <div className="flex items-center gap-1.5 pl-2">
                      <span className="font-bold text-game-muted text-xs line-through">
                        {levelUp.oldLevel}
                      </span>
                      <span className="font-black text-game-moss-strong text-sm">
                        Lvl {levelUp.newLevel}
                      </span>
                    </div>
                  </div>
                </RewardLedgerRow>
              )
            })()}
        </div>
      </div>
    </div>
  )
}
