'use client'

import { TaskIconDisplay } from '@/components/game/shared/TaskIconDisplay'
import { SectionDivider } from '@/components/ui/section-divider'
import { getGuild } from '@/data/guilds'
import type { GuildsData } from '@/types/user-data'
import { cn } from '@/lib/utils'

export function GuildProgressContent({
  guildId,
  guilds,
}: {
  guildId: string
  guilds: GuildsData | null | undefined
}) {
  const guild = getGuild(guildId)
  if (!guild) return null

  const progress = guilds?.[guildId]
  const rank = Math.max(0, Math.floor(progress?.rank || 0))
  const xp = Math.max(0, Math.floor(progress?.xp || 0))
  const current = guild.ranks.find((entry) => entry.rank === rank)
  const next = guild.ranks.find((entry) => entry.rank === rank + 1)
  const currentFloor = current?.totalXp || 0
  const nextThreshold = next?.totalXp || currentFloor
  const masteryThreshold = guild.ranks.at(-1)?.totalXp || 0
  const percentage = next
    ? Math.max(
        0,
        Math.min(100, ((xp - currentFloor) / (nextThreshold - currentFloor)) * 100),
      )
    : 100

  return (
    <div className="space-y-7">
      <p className="text-sm leading-relaxed text-game-muted">{guild.description}</p>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-game-card-border bg-game-surface-raised p-4 text-center">
          <div className="text-xs font-semibold text-game-muted">Current rank</div>
          <div className="mt-1 font-mono text-2xl font-semibold text-game-ink">
            {rank}
          </div>
          <div className="text-xs text-game-ochre">{current?.name || 'Not joined'}</div>
        </div>
        <div className="rounded-lg border border-game-card-border bg-game-surface-raised p-4 text-center">
          <div className="text-xs font-semibold text-game-muted">Guild XP</div>
          <div className="mt-1 font-mono text-2xl font-semibold text-game-ink">
            {xp.toLocaleString()}
          </div>
          <div className="text-xs text-game-muted">
            {masteryThreshold.toLocaleString()} to master
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-end justify-between gap-3 text-xs">
          <span className="font-semibold text-game-ink">
            {next ? `Toward Rank ${next.rank}` : 'Guild completed'}
          </span>
          <span className="font-mono text-game-muted">
            {next
              ? `${xp.toLocaleString()} / ${nextThreshold.toLocaleString()}`
              : `${masteryThreshold.toLocaleString()} / ${masteryThreshold.toLocaleString()}`}
          </span>
        </div>
        <div
          className="h-3 overflow-hidden rounded-full border border-game-border bg-game-canvas"
          role="progressbar"
          aria-label={`${guild.name} rank progress`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(percentage)}
        >
          <div
            className="h-full bg-game-ochre transition-[width] duration-300 motion-reduce:transition-none"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      <SectionDivider>Rank charter</SectionDivider>
      <div className="space-y-1">
        {guild.ranks.map((definition) => {
          const unlocked = rank >= definition.rank
          const revealed = unlocked || definition.rank === rank + 1
          const masked = !revealed
          return (
            <div
              key={definition.rank}
              className={cn(
                'flex min-h-16 items-center gap-3 border-b border-game-border/75 py-3 last:border-b-0',
                !unlocked && 'text-game-muted',
              )}
            >
              <div
                className={cn(
                  'game-icon-orb h-10 w-10 shrink-0',
                  unlocked
                    ? 'border-game-ochre/55 text-game-ochre'
                    : 'border-game-border text-game-muted',
                )}
              >
                <TaskIconDisplay
                  icon={revealed ? definition.icon || guild.icon : { type: 'item', id: 'researchers-journal-page' }}
                  className={cn(
                    'h-8 w-8',
                    (!unlocked || masked) && 'grayscale opacity-40',
                  )}
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-sm font-semibold text-game-ink">
                    Rank {definition.rank}: {revealed ? definition.name : '???'}
                  </h3>
                  <span className="shrink-0 font-mono text-xs text-game-muted">
                    {revealed ? `${definition.totalXp.toLocaleString()} XP` : '???'}
                  </span>
                </div>
                <p className="mt-1 text-xs leading-relaxed text-game-muted">
                  {revealed ? definition.unlocks.join(' · ') : '???'}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
