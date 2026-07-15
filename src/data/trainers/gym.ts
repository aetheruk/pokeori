import type { TrainerClass } from './types'

export const genericGymTrainerClasses = [
  {
    id: 'gym-leader',
    name: 'Gym Leader',
    spriteId: '/sprites/trainers/gym/kanto/brock.avif',
    payoutModifier: 99,
    gender: 'm',
    kind: 'gym',
    special: true,
  },
] as const satisfies readonly TrainerClass[]

const gymLeaders = {
  alola: ['acerola', 'hala', 'hapu', 'ilima', 'kiawe', 'lana', 'mallow', 'mina', 'nanu', 'olivia', 'sophocles'],
  galar: ['allister', 'bea', 'gordie', 'kabu', 'melony', 'milo', 'nessa', 'opal', 'piers', 'raihan'],
  hoenn: ['brawly', 'flannery', 'norman', 'roxanne', 'tateandliza', 'wallace', 'wattson', 'winona'],
  johto: ['bugsy', 'chuck', 'clair', 'falkner', 'jasmine', 'morty', 'pryce', 'whitney'],
  kalos: ['clemont', 'grant', 'korrina', 'olympia', 'ramos', 'valerie', 'viola', 'wulfric'],
  kanto: ['blaine', 'brock', 'erika', 'giovanni', 'koga', 'ltsurge', 'misty', 'sabrina'],
  paldea: ['brassius', 'grusha', 'iono', 'katy', 'kofu', 'larry', 'ryme', 'tulip'],
  sinnoh: ['byron', 'candice', 'crasherwake', 'fantina', 'gardenia', 'maylene', 'roark', 'volkner'],
  unova: ['brycen', 'burgh', 'chili', 'cilan', 'clay', 'cress', 'drayden', 'elesa', 'iris', 'lenora', 'skyla'],
} as const

const femaleGymLeaders = new Set([
  'acerola',
  'hapu',
  'lana',
  'mallow',
  'mina',
  'olivia',
  'bea',
  'melony',
  'nessa',
  'opal',
  'flannery',
  'roxanne',
  'winona',
  'clair',
  'jasmine',
  'whitney',
  'korrina',
  'olympia',
  'valerie',
  'viola',
  'erika',
  'misty',
  'sabrina',
  'iono',
  'katy',
  'ryme',
  'tulip',
  'candice',
  'fantina',
  'gardenia',
  'maylene',
  'elesa',
  'iris',
  'lenora',
  'skyla',
])

function displayName(id: string) {
  if (id === 'ltsurge') return 'Lt. Surge'
  if (id === 'tateandliza') return 'Tate & Liza'
  if (id === 'crasherwake') return 'Crasher Wake'
  return id.replace(/(^|-)([a-z])/g, (_, prefix: string, letter: string) => `${prefix ? ' ' : ''}${letter.toUpperCase()}`)
}

export const gymTrainerClasses = [
  ...genericGymTrainerClasses,
  ...Object.entries(gymLeaders).flatMap(([region, leaders]) =>
    leaders.map((leader) => ({
      id: `gym-${region}-${leader}`,
      name: `Gym Leader ${displayName(leader)}`,
      spriteId: `/sprites/trainers/gym/${region}/${leader}.avif`,
      payoutModifier: 99,
      gender: femaleGymLeaders.has(leader) ? 'f' : 'm',
      kind: 'gym',
      special: true,
    })),
  ),
] as readonly TrainerClass[]
