export interface Currency {
  id: string
  name: string
  iconId: string
}

export const currencies: Currency[] = [
  {
    id: 'crystals',
    name: 'Crystals',
    iconId: 'revive',
  },
  {
    id: 'mega-shards',
    name: 'Mega Shards',
    iconId: 'comet-shard',
  },
  {
    id: 'pokedollars',
    name: 'PokeDollars',
    iconId: 'relic-gold',
  },
  {
    id: 'battle-points',
    name: 'Battle Points',
    iconId: 'relic-copper',
  },
  {
    id: 'berry-powder',
    name: 'Berry Powder',
    iconId: 'heal-powder',
  },
  {
    id: 'prof-scrip',
    name: "Prof's Scrip",
    iconId: 'scrip',
  },
  {
    id: 'league-ticket',
    name: 'League Tickets',
    iconId: 'league-ticket',
  },
]

export function getCurrency(id: string): Currency | undefined {
  return currencies.find((c) => c.id === id)
}
