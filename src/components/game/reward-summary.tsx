import {
  CheckCircle2,
  Coins,
  FlaskConical,
  Package,
  Search,
  Star,
} from 'lucide-react'
import Image from 'next/image'
import { TaskIconDisplay } from '@/components/game/shared/TaskIconDisplay'
import { Card } from '@/components/ui/card'
import { getCurrency } from '@/data/currencies'
import { items } from '@/data/items'
import { getSkill } from '@/data/skills'
import { getIcon } from '@/data/user'
import { getPokemonImageUrl } from '@/utilities/pokemon/pokedex'
import { RewardSummary } from '@/utilities/rewards/reward-logic'
import { ItemSprite } from '../ui/item-sprite'
import { SectionDivider } from '../ui/section-divider'
import { CardRewardCarousel } from './card-reward-carousel'

const BACKGROUND_REWARD_SPRITE = '/sprites/items/forest-photo.avif'
const TITLE_REWARD_SPRITE = '/sprites/items/certificate.avif'

interface RewardSummaryDisplayProps {
  summary: RewardSummary
  title?: string
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
    !!summary.levelUp

  if (!hasRewards) return null

  return (
    <div className="space-y-6 p-4">
      <SectionDivider>{title}</SectionDivider>

      <div className="space-y-4">
        {/* Main Rewards Grid */}
        <div className="grid grid-cols-1 gap-2">
          {/* XP */}
          {xpEntries.map(([skillId, amount]) => {
            const skill = getSkill(skillId)
            const label = skill?.name ? `${skill.name} Exp` : 'Experience'
            const iconId = skill?.iconId

            return (
              <Card
                key={`xp-${skillId}`}
                className="p-2 bg-game-surface-raised border-game-border flex-row items-center gap-3 h-12"
              >
                <div className="w-8 h-8 rounded-lg bg-game-canvas flex items-center justify-center flex-shrink-0">
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
              </Card>
            )
          })}

          {/* Currency */}
          {(summary.currency || []).map((curr, i) => {
            const currencyDef = getCurrency(curr.type)
            return (
              <Card
                key={`curr-${i}`}
                className="p-2 bg-game-surface-raised border-game-border flex-row items-center gap-3 h-12"
              >
                <div className="w-8 h-8 rounded-lg bg-game-canvas flex items-center justify-center text-game-ochre flex-shrink-0">
                  {currencyDef ? (
                    <ItemSprite
                      itemId={currencyDef.iconId}
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
                      curr.quantity < 0 ? 'text-game-danger' : 'text-game-ochre'
                    }`}
                  >
                    {curr.quantity > 0 ? '+' : ''}
                    {curr.quantity}
                  </span>
                </div>
              </Card>
            )
          })}

          {/* Notices */}
          {(summary.notices || []).map((notice, i) => {
            const showMessage =
              notice.id !== 'random-event-spawned' && Boolean(notice.message)

            return (
              <Card
                key={`notice-${notice.id}-${i}`}
                className={`p-2 bg-game-surface-raised border-game-border flex-row items-center gap-3 ${
                  showMessage ? 'min-h-12' : 'h-12'
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-game-ochre/10 flex items-center justify-center flex-shrink-0">
                  <Search className="w-4 h-4 text-game-ochre" />
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
              </Card>
            )
          })}

          {/* Items */}
          {(summary.items || []).map((item, i) => {
            const itemDef = items.find((def) => def.id === item.id)
            return (
              <Card
                key={`item-${i}`}
                className="p-2 bg-game-surface-raised border-game-border flex-row items-center gap-3 h-12"
              >
                <div className="w-8 h-8 relative flex-shrink-0 bg-game-canvas rounded-lg p-0.5">
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
              </Card>
            )
          })}

          {/* Cards */}
          {(summary.cards || []).length > 0 && (
            <CardRewardCarousel cards={summary.cards} />
          )}

          {/* Pokemon */}
          {(summary.pokemon || []).map((p, i) => (
            <Card
              key={`poke-${i}`}
              className="p-2 bg-game-surface-raised border-game-border flex-row items-center gap-3 h-12"
            >
              <div className="w-8 h-8 relative flex-shrink-0 bg-game-canvas rounded-lg p-0.5">
                <Image
                  src={getPokemonImageUrl(p.speciesId, 'sprite', p.shiny)}
                  alt={p.name}
                  width={28}
                  height={28}
                  className="w-full h-full object-contain pixelated"
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
            </Card>
          ))}

          {/* Tasks Completed */}
          {summary.tasksCompleted?.map((task, i) => (
            <Card
              key={`task-${i}`}
              className="p-2 bg-game-surface-raised border-game-border flex-row items-center gap-3 h-12"
            >
              <div className="w-8 h-8 rounded-lg bg-game-canvas flex items-center justify-center text-game-moss-strong flex-shrink-0">
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
            </Card>
          ))}

          {/* Banners */}
          {summary.banners?.map((banner, i) => (
            <Card
              key={`banner-${i}`}
              className="p-2 bg-game-surface-raised border-game-border flex-row items-center gap-3 h-12"
            >
              <div className="w-8 h-8 relative rounded-lg bg-game-canvas flex items-center justify-center flex-shrink-0 p-0.5">
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
            </Card>
          ))}

          {/* Icons */}
          {summary.icons?.map((icon, i) => (
            <Card
              key={`icon-${i}`}
              className="p-2 bg-game-surface-raised border-game-border flex-row items-center gap-3 h-12"
            >
              <div className="w-8 h-8 relative rounded-lg bg-game-canvas flex items-center justify-center flex-shrink-0 p-0.5">
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
            </Card>
          ))}

          {/* Titles */}
          {summary.titles?.map((titleItem, i) => (
            <Card
              key={`title-${i}`}
              className="p-2 bg-game-surface-raised border-game-border flex-row items-center gap-3 h-12"
            >
              <div className="w-8 h-8 relative rounded-lg bg-game-canvas flex items-center justify-center flex-shrink-0 p-0.5">
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
            </Card>
          ))}

          {/* Upgrades */}
          {summary.upgrades?.map((upgrade, i) => (
            <Card
              key={`upgrade-${i}`}
              className="p-2 bg-game-surface-raised border-game-border flex-row items-center gap-3 h-12"
            >
              <div className="w-8 h-8 rounded-lg bg-game-canvas flex items-center justify-center text-game-moss-strong flex-shrink-0">
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
            </Card>
          ))}

          {/* Research XP */}
          {(summary.researchXp || []).map((res, i) => (
            <Card
              key={`research-xp-${i}`}
              className="h-12 flex-row items-center gap-2 border-game-border bg-game-surface-raised p-2 sm:gap-3"
            >
              <div className="w-8 h-8 relative flex-shrink-0 bg-game-canvas rounded-lg p-0.5">
                <Image
                  src={getPokemonImageUrl(res.formId, 'sprite')}
                  alt={res.formName}
                  width={28}
                  height={28}
                  className="w-full h-full object-contain pixelated"
                />
              </div>
              <div className="flex min-w-0 flex-1 items-center justify-between gap-2 sm:pr-2">
                <span className="truncate text-xs font-medium text-game-ink sm:text-sm">
                  {res.formName} Research
                </span>
                <span className="shrink-0 whitespace-nowrap text-xs font-bold text-game-moss-strong sm:text-sm">
                  +{res.amount} XP
                </span>
              </div>
            </Card>
          ))}

          {/* Research Breakthroughs */}
          {(summary.researchBreakthroughs || []).map((b, i) => (
            <Card
              key={`research-break-${i}`}
              className="p-2 bg-game-surface-raised border-game-moss/35 flex-row items-center gap-3 min-h-12"
            >
              <div className="w-8 h-8 relative flex-shrink-0 bg-game-moss/10 rounded-lg p-0.5 border border-game-moss/30">
                <Image
                  src={getPokemonImageUrl(b.formId, 'sprite')}
                  alt={b.pokemonName}
                  width={28}
                  height={28}
                  className="w-full h-full object-contain pixelated"
                />
              </div>
              <div className="flex-1 flex flex-col min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-game-moss-strong text-xs uppercase tracking-tight">
                    Breakthrough!
                  </span>
                  <span className="font-black text-game-moss-strong text-sm">
                    LVL {b.newLevel}
                  </span>
                </div>
                <span className="text-[10px] text-game-muted font-medium truncate">
                  {b.pokemonName} Research Complete
                </span>
              </div>
            </Card>
          ))}
          {/* Level Up */}
          {summary.levelUp &&
            (() => {
              const levelUp = summary.levelUp
              const skill = getSkill(levelUp.skillId)
              const iconId = skill?.iconId

              return (
                <Card className="p-2 bg-game-surface-raised border-game-border flex-row items-center gap-3 h-12 mt-2">
                  <div className="w-8 h-8 rounded-lg bg-game-canvas flex items-center justify-center flex-shrink-0 border border-game-moss/30">
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
                </Card>
              )
            })()}
        </div>
      </div>
    </div>
  )
}
