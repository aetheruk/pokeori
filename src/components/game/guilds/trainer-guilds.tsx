'use client'

import { useState } from 'react'
import { GameInfoModal } from '@/components/game/shared/GameInfoModal'
import {
  GuildJournalIcon,
  GuildProgressContent,
} from '@/components/game/guilds/guild-progress'
import { SectionDivider } from '@/components/ui/section-divider'
import { useUser } from '@/context/UserContext'
import { getGuild, guilds as guildDefinitions } from '@/data/guilds'
import type { GuildsData } from '@/types/user-data'

export function TrainerGuilds() {
  const { user } = useUser()
  const userGuilds = ((user as any)?.guilds || {}) as GuildsData
  const joined = guildDefinitions.filter(
    (guild) => (userGuilds[guild.id]?.rank || 0) > 0,
  )
  const [selectedGuildId, setSelectedGuildId] = useState<string | null>(null)
  const selectedGuild = selectedGuildId ? getGuild(selectedGuildId) : undefined

  if (joined.length === 0) return null

  return (
    <div className="space-y-4">
      <SectionDivider>Guilds</SectionDivider>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3">
        {joined.map((guild) => {
          const progress = userGuilds[guild.id]!
          return (
            <button
              key={guild.id}
              type="button"
              className="game-focus-ring flex min-h-16 w-full items-center gap-3 rounded-lg border border-game-card-border bg-game-surface p-3 text-left transition-colors hover:border-game-charcoal/35 hover:bg-game-surface-raised"
              onClick={() => setSelectedGuildId(guild.id)}
              aria-label={`View ${guild.name} details`}
            >
              <div className="game-icon-orb h-12 w-12 shrink-0 border-game-ochre/45">
                <GuildJournalIcon className="h-9 w-9" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold text-game-ink">
                  {guild.name}
                </div>
                <div className="mt-1 font-mono text-xs text-game-muted">
                  {(progress.xp || 0).toLocaleString()} Guild XP
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-semibold text-game-muted">Rank</div>
                <div className="font-mono text-xl font-semibold text-game-ochre">
                  {progress.rank || 1}
                </div>
              </div>
            </button>
          )
        })}
      </div>

      <GameInfoModal
        open={Boolean(selectedGuild)}
        onOpenChange={(open) => !open && setSelectedGuildId(null)}
        presentation="drawer"
        title={selectedGuild?.name || 'Guild'}
        description={selectedGuild?.description}
        category="Guild charter"
        background={selectedGuild?.background}
        icon={<GuildJournalIcon className="h-12 w-12" />}
      >
        {selectedGuild ? (
          <GuildProgressContent guildId={selectedGuild.id} guilds={userGuilds} />
        ) : null}
      </GameInfoModal>
    </div>
  )
}
