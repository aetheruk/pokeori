import type { GuildDefinition } from './types'

export const UNDERGROUND_SOCIETY_GUILD_ID = 'underground-society'

export const undergroundSocietyGuild: GuildDefinition = {
  id: UNDERGROUND_SOCIETY_GUILD_ID,
  name: 'Underground Society',
  description:
    'A quiet network beneath Kanto that turns cards, collectors, and crystal into influence.',
  category: 'Underground',
  subCategory: 'Kanto Underground',
  background: '/backgrounds/kanto-underground.avif',
  icon: { type: 'trainer', id: 'tcg-maniac-m' },
  ranks: [
    {
      rank: 1,
      totalXp: 0,
      name: 'New Recruit',
      description: 'You have been accepted into the Society and given a place in the records.',
      unlocks: ['Society membership', 'Deck Box and Card Redistribution Box training'],
    },
    {
      rank: 2,
      totalXp: 10000,
      name: 'TCG Maniac',
      description: 'Your knowledge of the product is useful enough to attract attention upstairs.',
      unlocks: ['Underground promo card shop'],
    },
    {
      rank: 3,
      totalXp: 25000,
      name: 'TCG Influencer',
      description: 'Your recommendations move product, and your duplicates can now be routed in bulk.',
      unlocks: ['Bulk send of duplicate cards to HQ'],
    },
    {
      rank: 4,
      totalXp: 50000,
      name: 'TCG Operative',
      description: 'A trusted operator with room to grow into the Society’s deeper work.',
      unlocks: [],
    },
    {
      rank: 5,
      totalXp: 100000,
      name: 'Supervisor',
      description: 'You can supervise a small operation without losing track of the cards.',
      unlocks: [],
    },
    {
      rank: 6,
      totalXp: 180000,
      name: 'Operations Manager',
      description: 'Your reports now shape how the Society moves product across Kanto.',
      unlocks: [],
    },
    {
      rank: 7,
      totalXp: 300000,
      name: 'Regional Lead',
      description: 'Regional operations answer to you, at least when they remember.',
      unlocks: [],
    },
    {
      rank: 8,
      totalXp: 480000,
      name: 'Global Lead',
      description: 'Your influence reaches well beyond the tunnels beneath Kanto.',
      unlocks: [],
    },
    {
      rank: 9,
      totalXp: 720000,
      name: 'Pits Favoured',
      description: 'The Society speaks of you with unusual caution near the deepest chambers.',
      unlocks: [],
    },
    {
      rank: 10,
      totalXp: 1000000,
      name: 'Lord of the Pit',
      description: 'The title is unofficial, but nobody in the tunnels has found a better one.',
      unlocks: [],
    },
  ],
}
