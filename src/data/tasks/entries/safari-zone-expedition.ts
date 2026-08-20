import type { Reward } from '../../types'
import type { Task } from '../../types'

const background = '/backgrounds/safari-reserve.avif'

function safariTask({
  id,
  name,
  description,
  icon,
  rewards = [],
  completeButtonText = 'Record the Finding',
  repeatable = true,
  requirements = [],
}: {
  id: string
  name: string
  description: string
  icon: Task['icon']
  rewards?: Reward[]
  completeButtonText?: string
  repeatable?: boolean
  requirements?: Task['requirements']
}): Task {
  return {
    id,
    name,
    description,
    category: 'Secret',
    subCategory: 'Safari Zone',
    icon,
    background,
    repeatable,
    expeditionOnly: true,
    secret: true,
    completionTrigger: 'manual',
    completeButtonText,
    requirements,
    criteria: [],
    rewards,
  }
}

type ResearchSpecies = {
  id: string
  name: string
  common: string
  uncommon: string
  rare: string
}

const researchSpecies: ResearchSpecies[] = [
  {
    id: '29',
    name: 'Nidoran♀',
    common: 'I take a quiet break and watch a Nidoran♀ nose through the grass for seeds.',
    uncommon: 'I follow a Nidoran♀ through the grass until the stems spring back and I lose her trail.',
    rare: 'A Nidoran♀ approaches with surprising confidence, sniffing my notebook before settling beside my boot.',
  },
  {
    id: '32',
    name: 'Nidoran♂',
    common: 'I pause beside the path to watch a Nidoran♂ spar with a reed and declare victory.',
    uncommon: 'I track a Nidoran♂ through the mud, but his little footprints vanish among the Ranger’s boot marks.',
    rare: 'A broad-shouldered Nidoran♂ lets me study his horns from a safe distance before trotting away.',
  },
  {
    id: '30',
    name: 'Nidorina',
    common: 'I watch a Nidorina pick her way through the shade, stopping whenever the leaves rustle.',
    uncommon: 'After circling the same thicket twice, I realise the Nidorina has been watching me instead.',
    rare: 'A calm Nidorina comes close enough to accept a few berries from my open hand.',
  },
  {
    id: '33',
    name: 'Nidorino',
    common: 'I take a break to watch a Nidorino chase dust motes through a patch of sunlight.',
    uncommon: 'I follow a Nidorino’s sharp tracks for ages, only to find he doubled back behind me.',
    rare: 'A powerful Nidorino lowers his horn, studies me carefully, then decides I am not worth charging.',
  },
  {
    id: '46',
    name: 'Paras',
    common: 'I watch a Paras shuffle beneath the ferns, carrying two mushrooms like tiny umbrellas.',
    uncommon: 'I track a Paras beneath the leaf litter until the trail dissolves into a dozen mushroom stems.',
    rare: 'A Paras settles at my feet and allows me to sketch the markings on its bright mushroom caps.',
  },
  {
    id: '47',
    name: 'Parasect',
    common: 'I keep my distance and watch a Parasect patrol the damp edge of the western woods.',
    uncommon: 'I follow the powdery trail of a Parasect, but the breeze scatters every useful clue.',
    rare: 'A huge Parasect emerges from the ferns and waits patiently while I record its unusual growth.',
  },
  {
    id: '48',
    name: 'Venonat',
    common: 'I sit beneath the trees and watch a Venonat blink at every tiny movement in the undergrowth.',
    uncommon: 'I track a Venonat through the brush for what feels like forever, then lose it in a cloud of pollen.',
    rare: 'A round Venonat climbs onto a fallen log beside me and lets its eyes follow my pencil strokes.',
  },
  {
    id: '49',
    name: 'Venomoth',
    common: 'I stop to watch a Venomoth drift between the trees, barely disturbing the hanging vines.',
    uncommon: 'I follow a Venomoth’s powder trail from branch to branch until it disappears over the canopy.',
    rare: 'A large Venomoth circles once above my head, then settles close enough for a careful wing study.',
  },
  {
    id: '84',
    name: 'Doduo',
    common: 'I take a break to watch a Doduo race across the boardwalk and somehow avoid every loose plank.',
    uncommon: 'I track a Doduo across the eastern reeds, but the two sets of footprints lead in opposite directions.',
    rare: 'A Doduo slows beside me, both heads staring with equal suspicion while I finish my notes.',
  },
  {
    id: '102',
    name: 'Exeggcute',
    common: 'I watch an Exeggcute cluster roll gently through the grass as if the whole group shares one thought.',
    uncommon: 'I follow an Exeggcute cluster until one egg rolls left, another rolls right, and the trail becomes useless.',
    rare: 'A perfectly arranged Exeggcute cluster waits in the sunlight while I record how the group moves together.',
  },
  {
    id: '104',
    name: 'Cubone',
    common: 'I watch a Cubone practise small, determined swings at a fallen branch near the northern path.',
    uncommon: 'I follow a Cubone’s careful footprints, but the trail ends at a boulder and I cannot tell where it climbed.',
    rare: 'A solemn Cubone sits nearby while I sketch the pattern of its bone helmet without getting too close.',
  },
  {
    id: '105',
    name: 'Marowak',
    common: 'I take a quiet moment to watch a Marowak mark the earth with the end of its bone club.',
    uncommon: 'I track a Marowak along the rocky ledge, but a single heavy thump sends me searching in the wrong direction.',
    rare: 'A tall Marowak demonstrates a precise, graceful swing before turning back towards the hills.',
  },
  {
    id: '111',
    name: 'Rhyhorn',
    common: 'I take a break to watch a Rhyhorn lumber through the plains, stopping to sniff every stone.',
    uncommon: 'After tracking a Rhyhorn for what seems like forever, I lose the trail beneath a churned-up patch of earth.',
    rare: 'A huge Rhyhorn approaches cautiously, then lowers its head so I can inspect the scrapes on its horn.',
  },
  {
    id: '113',
    name: 'Chansey',
    common: 'I watch a Chansey distribute berries among a nervous group before quietly moving on.',
    uncommon: 'I follow a Chansey through the tall grass, but every turn is hidden by the same soft pink flowers.',
    rare: 'A gentle Chansey approaches and offers me a warm egg before wandering back into the reeds.',
  },
  {
    id: '114',
    name: 'Tangela',
    common: 'I watch a Tangela creep around the roots, its vines blending perfectly with the tangled undergrowth.',
    uncommon: 'I track a Tangela by the vines it leaves behind, then realise the vines have wrapped around my own marker.',
    rare: 'A thick curtain of vines parts to reveal a Tangela calmly studying me from the shade.',
  },
  {
    id: '115',
    name: 'Kangaskhan',
    common: 'I take a break to watch a Kangaskhan move across the plain with a little one safely tucked away.',
    uncommon: 'I track a Kangaskhan for ages, but the family crosses a stream and the water carries the trail away.',
    rare: 'A mother Kangaskhan approaches cautiously, allowing me to observe the youngster peeking from her pouch.',
  },
  {
    id: '123',
    name: 'Scyther',
    common: 'I watch a Scyther cut through the tall grass in clean, silent strokes from a very safe distance.',
    uncommon: 'I follow the neat cuts left by a Scyther, but the trail stops where the grass is already perfectly flat.',
    rare: 'A magnificent Scyther pauses on a fallen trunk and lets the light catch along both of its blades.',
  },
  {
    id: '127',
    name: 'Pinsir',
    common: 'I watch a Pinsir wrestle a dead branch into a better position beneath the western trees.',
    uncommon: 'I track a Pinsir by the bark torn from the trees, then lose it when the whole grove starts creaking.',
    rare: 'A massive Pinsir approaches with its pincers lowered, then relaxes when I place a berry on the ground.',
  },
  {
    id: '128',
    name: 'Tauros',
    common: 'I take a break to watch the Tauros running around the plains, kicking up golden dust behind them.',
    uncommon: 'After tracking a Tauros for what seems like forever, I lose the trail where the herd crossed the road.',
    rare: 'A huge Tauros with a magnificent mane approaches cautiously, allowing me to feed it.',
  },
]

function researchTask(
  species: ResearchSpecies,
  variant: 'common' | 'uncommon' | 'rare',
): Task {
  const rewardXp = variant === 'common' ? 2 : variant === 'uncommon' ? 10 : 20
  return safariTask({
    id: `safari-research-${species.id}-${variant}`,
    name:
      variant === 'common'
        ? `A Quiet ${species.name}`
        : variant === 'uncommon'
          ? `Following ${species.name}`
          : `A Remarkable ${species.name}`,
    description: species[variant],
    icon: { type: 'pokemon', id: species.id },
    rewards: [
      {
        type: 'pokemon_research_xp',
        targetId: species.id,
        quantity: rewardXp,
        dropChance: 100,
      },
    ],
    completeButtonText: 'Record Observation',
  })
}

const researchTasks = researchSpecies.flatMap((species) => [
  researchTask(species, 'common'),
  researchTask(species, 'uncommon'),
  researchTask(species, 'rare'),
])

export const safariResearchTaskPoolIds = {
  common: researchSpecies.map((species) => `safari-research-${species.id}-common`),
  uncommon: researchSpecies.map((species) => `safari-research-${species.id}-uncommon`),
  rare: researchSpecies.map((species) => `safari-research-${species.id}-rare`),
}

const flavorDefinitions = [
  ['central', 'A Ranger’s Chalk Mark', 'I find a fresh chalk mark on the central signpost and copy it into my notebook.', 'Copy the Mark', { type: 'trainer', id: 'ranger' }],
  ['central', 'A Bent Trail Marker', 'The central marker is pointing at the sky. I set it straight before the next survey team arrives.', 'Straighten the Marker', { type: 'local', id: '/sprites/sign.avif' }],
  ['central', 'A Warm Patch of Grass', 'I find a warm patch in the grass and give it a moment before deciding what made it.', 'Check the Grass', { type: 'local', id: '/sprites/tall_grass-v2.avif' }],
  ['central', 'The Missing Clipboard', 'A clipboard is wedged beneath the central bench. I brush it off and return it to the supply crate.', 'Return the Clipboard', { type: 'item', id: 'researchers-journal' }],
  ['east', 'A Reed-Caught Ribbon', 'A faded ribbon is caught in the eastern reeds. I pull it free without disturbing the bank.', 'Free the Ribbon', { type: 'item', id: 'pretty-feather' }],
  ['east', 'Rain in the Pond', 'The pond is perfectly still except for one set of ripples. I wait until they fade before moving on.', 'Watch the Ripples', { type: 'item', id: 'pearl' }],
  ['east', 'A Boardwalk Creak', 'One board gives a loud creak under my foot. I mark it with a strip of survey tape.', 'Mark the Board', { type: 'item', id: 'wood-scraps-t1' }],
  ['east', 'The Empty Bait Tin', 'I find an empty bait tin near the water and carry it back to the nearest collection point.', 'Collect the Tin', { type: 'item', id: 'metal-scrap-t1' }],
  ['west', 'A Leaf-Covered Bench', 'The western bench is almost swallowed by leaves. I clear enough space to sit and check my map.', 'Clear the Bench', { type: 'item', id: 'grass-gem' }],
  ['west', 'A Broken Umbrella', 'Someone left a broken umbrella against the rest house. I fold it away from the path.', 'Move the Umbrella', { type: 'trainer', id: 'ranger' }],
  ['west', 'A Scent on the Bark', 'There is a sharp scent on the bark beside the trail. I note it and leave the tree untouched.', 'Note the Scent', { type: 'pokemon', id: '48' }],
  ['west', 'A Quiet Hollow', 'I find a hollow beneath the roots and lower my voice before passing it.', 'Pass Quietly', { type: 'pokemon', id: '46' }],
  ['north', 'A Stone Cairn', 'Someone has stacked three stones beside the northern track. I sketch the little cairn before leaving it alone.', 'Sketch the Cairn', { type: 'item', id: 'small-stone-t1' }],
  ['north', 'A Loose Trail Rope', 'A length of rope has come loose beside the ledge. I tie it back before the next person reaches the drop.', 'Secure the Rope', { type: 'item', id: 'escape-rope' }],
  ['north', 'Wind through the Pass', 'The wind funnels through the northern pass hard enough to rattle my notes. I find shelter and wait it out.', 'Wait in Shelter', { type: 'item', id: 'wing-feather-t1' }],
  ['north', 'A Fresh Scrape', 'A fresh scrape crosses the trail, but there is no sign of what made it. I mark the location and move on.', 'Mark the Scrape', { type: 'pokemon', id: '111' }],
] as const

const flavorTasks = flavorDefinitions.map(([area, name, description, completeButtonText, icon]) =>
  safariTask({
    id: `safari-flavor-${area}-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    name,
    description,
    icon,
    rewards: [{ type: 'xp', skill: 'researching', quantity: { min: 20, max: 50 }, dropChance: 100 }],
    completeButtonText,
  }),
)

export const safariFlavorTaskPoolIds = {
  central: flavorTasks.filter((task) => task.id.startsWith('safari-flavor-central-')).map((task) => task.id),
  east: flavorTasks.filter((task) => task.id.startsWith('safari-flavor-east-')).map((task) => task.id),
  west: flavorTasks.filter((task) => task.id.startsWith('safari-flavor-west-')).map((task) => task.id),
  north: flavorTasks.filter((task) => task.id.startsWith('safari-flavor-north-')).map((task) => task.id),
}

function itemTask(
  id: string,
  name: string,
  description: string,
  icon: string | Task['icon'],
  reward: Reward,
): Task {
  return safariTask({
    id,
    name,
    description,
    icon: typeof icon === 'string' ? { type: 'item', id: icon } : icon,
    rewards: [reward],
    completeButtonText: 'Search the Find',
  })
}

const materialFinds = [
  ['soft-fluff-t1', 'Soft Fluff', 'A pale tuft of Soft Fluff clings to a low branch.'],
  ['cinder-shard-t1', 'Cinder Shard', 'A warm Cinder Shard glints among the dry grass.'],
  ['aqua-solvent-t1', 'Aqua Solvent', 'A sealed bead of Aqua Solvent rests beside the pond.'],
  ['electric-component-t1', 'Electric Component', 'A small Electric Component hums beneath the boardwalk.'],
  ['wood-scraps-t1', 'Wood Scraps', 'Fresh Wood Scraps lie where something gnawed through a branch.'],
  ['frost-crystal-t1', 'Frost Crystal', 'A Frost Crystal survives in a shaded crack beneath the northern stones.'],
  ['grip-weave-t1', 'Grip Weave', 'A strip of Grip Weave is snagged on a broken trail rope.'],
  ['toxic-resin-t1', 'Toxic Resin', 'A bead of Toxic Resin has hardened on the underside of a leaf.'],
  ['terra-dust-t1', 'Soft Clay', 'A patch of Soft Clay has been turned up beside the path.'],
  ['wing-feather-t1', 'Wing Feather', 'A clean Wing Feather rests on the edge of the western shelter.'],
  ['mind-thread-t1', 'Rune Stone', 'A faintly humming Rune Stone sits among the roots.'],
  ['chitin-fragment-t1', 'Chitin Fragment', 'A polished Chitin Fragment catches the light in the grass.'],
  ['small-stone-t1', 'Small Stone', 'A dense Small Stone has been exposed by the rain.'],
  ['spirit-wisp-t1', 'Ectoplasm', 'A faint trace of Ectoplasm clings to the cool side of a tree.'],
  ['drake-scale-t1', 'Drake Scale', 'A hard Drake Scale lies beneath a fallen leaf.'],
  ['shadow-fiber-t1', 'Shadow Cloth', 'A thread of Shadow Cloth is caught on a thorn.'],
  ['pixie-powder-t1', 'Fairy Charm', 'A little Fairy Charm glitters beside the old marker.'],
  ['metal-scrap-t1', 'Metal Scrap', 'Useful Metal Scrap is scattered beside a damaged service crate.'],
] as const

const materialTasks = materialFinds.map(([itemId, name, description]) =>
  itemTask(
    `safari-item-material-${itemId.replace('-t1', '')}`,
    `A Find: ${name}`,
    description,
    itemId,
    { type: 'item', targetId: itemId, quantity: 5, dropChance: 75 },
  ),
)

const ballTasks = [
  itemTask('safari-item-poke-ball-cache', 'A Few Poké Balls', 'A weatherproof pouch contains a few usable Poké Balls beneath the central path.', 'poke-ball', { type: 'item', targetId: 'poke-ball', quantity: { min: 1, max: 3 }, dropChance: 75 }),
  itemTask('safari-item-great-ball-cache', 'A Great Ball Cache', 'A Ranger’s old cache holds several Great Balls in a dry compartment.', 'great-ball', { type: 'item', targetId: 'great-ball', quantity: { min: 1, max: 3 }, dropChance: 60 }),
  itemTask('safari-item-ultra-ball-cache', 'An Ultra Ball Cache', 'A locked field case has one of the reserve team’s better Ball supplies inside.', 'ultra-ball', { type: 'item', targetId: 'ultra-ball', quantity: { min: 1, max: 3 }, dropChance: 45 }),
]

const gemIds = [
  'normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison', 'ground',
  'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'steel', 'dark', 'fairy',
]

const gemTasks = gemIds.map((type) =>
  itemTask(
    `safari-item-${type}-gem-find`,
    `A ${type[0].toUpperCase()}${type.slice(1)} Gem`,
    `A small ${type} gem catches the light between the roots. I should mark exactly where I found it.`,
    `${type}-gem`,
    { type: 'item', targetId: `${type}-gem`, quantity: { min: 1, max: 3 }, dropChance: 50 },
  ),
)

const currencyTasks = [
  itemTask('safari-item-coins-central', 'Coins in the Grass', 'A few coins shine beneath the central grass where a careless visitor dropped them.', { type: 'item', id: 'gimmighoul-coin' }, { type: 'currency', targetId: 'pokedollars', quantity: { min: 100, max: 300 }, dropChance: 60 }),
  itemTask('safari-item-coins-boardwalk', 'Coins under the Boardwalk', 'Something metallic glints between two boardwalk planks. I fish it out with my pencil.', { type: 'item', id: 'gimmighoul-coin' }, { type: 'currency', targetId: 'pokedollars', quantity: { min: 100, max: 300 }, dropChance: 60 }),
  itemTask('safari-item-coins-north', 'Coins by the Cairn', 'A small handful of coins rests beside the northern stone cairn.', { type: 'item', id: 'gimmighoul-coin' }, { type: 'currency', targetId: 'pokedollars', quantity: { min: 100, max: 300 }, dropChance: 60 }),
]

const safariBallTasks = [
  itemTask('safari-item-extra-balls', 'A Reserve Ball Tin', 'A sealed tin contains a few reserve Safari Balls. I should keep them for something that will not wait around.', 'safari-ball', { type: 'expedition_safari_balls', quantity: { min: 1, max: 3 }, dropChance: 35 }),
]

const rareItemTasks = [
  safariTask({
    id: 'safari-rare-nugget-find',
    name: 'Gold beneath the Grass',
    description: 'Something heavy is buried beneath the roots. I can feel the shape of a Nugget through the soil.',
    icon: { type: 'item', id: 'nugget' },
    completeButtonText: 'Dig Carefully',
    repeatable: false,
    requirements: [{ type: 'task_completed', targetId: 'safari-rare-nugget-find', inverse: true }],
    rewards: [{ type: 'item', targetId: 'nugget', quantity: 1, dropChance: 50 }],
  }),
  safariTask({
    id: 'safari-rare-metal-seam',
    name: 'A Rich Metal Seam',
    description: 'The damaged service crate has opened a narrow seam of dense metal. This is far more than ordinary scrap.',
    icon: { type: 'item', id: 'metal-scrap-t1' },
    completeButtonText: 'Collect the Deposit',
    repeatable: false,
    requirements: [{ type: 'task_completed', targetId: 'safari-rare-metal-seam', inverse: true }],
    rewards: [{ type: 'item', targetId: 'metal-scrap-t1', quantity: 50, dropChance: 60 }],
  }),
]

export const safariItemTaskPoolIds = {
  materials: materialTasks.map((task) => task.id),
  balls: ballTasks.map((task) => task.id),
  gems: gemTasks.map((task) => task.id),
  currency: currencyTasks.map((task) => task.id),
  safariBalls: safariBallTasks.map((task) => task.id),
  rare: rareItemTasks.map((task) => task.id),
}

export const safariExpeditionContentTasks: Task[] = [
  ...researchTasks,
  ...flavorTasks,
  ...materialTasks,
  ...ballTasks,
  ...gemTasks,
  ...currencyTasks,
  ...safariBallTasks,
  ...rareItemTasks,
]
