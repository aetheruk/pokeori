import { fuchsiaResearchGuild } from './fuchsia-research'
import type { GuildDefinition } from './types'

export * from './types'

export const guilds: GuildDefinition[] = [fuchsiaResearchGuild]

export function getGuild(id: string): GuildDefinition | undefined {
  return guilds.find((guild) => guild.id === id)
}

export function getGuildRankForXp(guild: GuildDefinition, xp: number): number {
  const safeXp = Math.max(0, Math.floor(xp))
  let rank = 1
  for (const definition of guild.ranks) {
    if (safeXp >= definition.totalXp) rank = definition.rank
  }
  return Math.min(guild.ranks.length, rank)
}

export function getGuildMaxXp(guild: GuildDefinition): number {
  return guild.ranks[guild.ranks.length - 1]?.totalXp || 0
}

export function getGuildRankDefinition(guildId: string, rank: number) {
  return getGuild(guildId)?.ranks.find((entry) => entry.rank === rank)
}
