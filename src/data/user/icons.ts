import type { TaskIcon } from '@/data/tasks'

export interface IconConfig {
  id: string
  name: string
  icon: TaskIcon
}

export const icons: IconConfig[] = [
  { id: 'ditto', name: 'Ditto', icon: { type: 'pokemon', id: '132' } },
  { id: 'trainer-red', name: 'Red', icon: { type: 'trainer', id: 'red' } },
  { id: 'trainer-leaf', name: 'Leaf', icon: { type: 'trainer', id: 'leaf' } },
  { id: 'charmander', name: 'Charmander', icon: { type: 'pokemon', id: '4' } },
  { id: 'squirtle', name: 'Squirtle', icon: { type: 'pokemon', id: '7' } },
  { id: 'bulbasaur', name: 'Bulbasaur', icon: { type: 'pokemon', id: '1' } },
  { id: 'brock', name: 'Brock', icon: { type: 'trainer', id: 'gym-kanto-brock' } },
  { id: 'misty', name: 'Misty', icon: { type: 'trainer', id: 'gym-kanto-misty' } },
  { id: 'lt-surge', name: 'Lt. Surge', icon: { type: 'trainer', id: 'gym-kanto-ltsurge' } },
  {
    id: 'rocket-m',
    name: 'Team Rocket Grunt',
    icon: { type: 'trainer', id: 'rocket-grunt-m' },
  },
  {
    id: 'rocket-f',
    name: 'Team Rocket Grunt',
    icon: { type: 'trainer', id: 'rocket-grunt-f' },
  },
  {
    id: 'sailor',
    name: 'Sailor',
    icon: { type: 'trainer', id: 'sailor' },
  },
  {
    id: 'hiker',
    name: 'Hiker',
    icon: { type: 'trainer', id: 'hiker' },
  },
  {
    id: 'trainer-gb-red',
    name: 'Red 1',
    icon: { type: 'trainer', id: 'gb-red' },
  },
  {
    id: 'trainer-gb-blue',
    name: 'Blue 1',
    icon: { type: 'trainer', id: 'gb-blue' },
  },
  {
    id: 'trainer-gb-red-2',
    name: 'Red 2',
    icon: { type: 'trainer', id: 'gb-red-2' },
  },
  {
    id: 'trainer-gb-blue-2',
    name: 'Blue 2',
    icon: { type: 'trainer', id: 'gb-blue-2' },
  },
  { id: 'nugget', name: 'Nugget', icon: { type: 'item', id: 'nugget' } },
  { id: 'nidoking', name: 'Nidoking', icon: { type: 'pokemon', id: '34' } },
  { id: 'nidoqueen', name: 'Nidoqueen', icon: { type: 'pokemon', id: '31' } },
  // Gen 2
  { id: 'chikorita', name: 'Chikorita', icon: { type: 'pokemon', id: '152' } },
  { id: 'cyndaquil', name: 'Cyndaquil', icon: { type: 'pokemon', id: '155' } },
  { id: 'totodile', name: 'Totodile', icon: { type: 'pokemon', id: '158' } },
  // Gen 3
  { id: 'treecko', name: 'Treecko', icon: { type: 'pokemon', id: '252' } },
  { id: 'torchic', name: 'Torchic', icon: { type: 'pokemon', id: '255' } },
  { id: 'mudkip', name: 'Mudkip', icon: { type: 'pokemon', id: '258' } },
  // Gen 4
  { id: 'turtwig', name: 'Turtwig', icon: { type: 'pokemon', id: '387' } },
  { id: 'chimchar', name: 'Chimchar', icon: { type: 'pokemon', id: '390' } },
  { id: 'piplup', name: 'Piplup', icon: { type: 'pokemon', id: '393' } },
  // Gen 5
  { id: 'snivy', name: 'Snivy', icon: { type: 'pokemon', id: '495' } },
  { id: 'tepig', name: 'Tepig', icon: { type: 'pokemon', id: '498' } },
  { id: 'oshawott', name: 'Oshawott', icon: { type: 'pokemon', id: '501' } },
  // Gen 6
  { id: 'chespin', name: 'Chespin', icon: { type: 'pokemon', id: '650' } },
  { id: 'fennekin', name: 'Fennekin', icon: { type: 'pokemon', id: '653' } },
  { id: 'froakie', name: 'Froakie', icon: { type: 'pokemon', id: '656' } },
  // Gen 7
  { id: 'rowlet', name: 'Rowlet', icon: { type: 'pokemon', id: '722' } },
  { id: 'litten', name: 'Litten', icon: { type: 'pokemon', id: '725' } },
  { id: 'popplio', name: 'Popplio', icon: { type: 'pokemon', id: '728' } },
  // Gen 8
  { id: 'grookey', name: 'Grookey', icon: { type: 'pokemon', id: '810' } },
  { id: 'scorbunny', name: 'Scorbunny', icon: { type: 'pokemon', id: '813' } },
  { id: 'sobble', name: 'Sobble', icon: { type: 'pokemon', id: '816' } },
  // Gen 9
  { id: 'sprigatito', name: 'Sprigatito', icon: { type: 'pokemon', id: '906' } },
  { id: 'fuecoco', name: 'Fuecoco', icon: { type: 'pokemon', id: '909' } },
  { id: 'quaxly', name: 'Quaxly', icon: { type: 'pokemon', id: '912' } },
]

export function getIcon(id: string): IconConfig | undefined {
  return icons.find((i) => i.id === id)
}
