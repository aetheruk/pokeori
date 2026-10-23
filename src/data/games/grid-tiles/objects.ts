import type { GridObjectDefinition, GridObjectLibrary } from './types'

/**
 * Shared gameplay entities. Keep them independent of terrain sets so the same
 * object can be placed in multiple maps; variant rules decide how it resolves.
 */
export const gridObjects = {
  voltorb: {
    id: 'voltorb',
    name: 'Voltorb',
    purpose: 'hazard',
    size: { cols: 1, rows: 1 },
    asset: { src: '/games/overworld/voltorb-idle.png' },
    collision: 'pushable',
  },
  breakableRock: {
    id: 'breakable-rock',
    name: 'Breakable Rock',
    purpose: 'destructible',
    size: { cols: 1, rows: 1 },
    asset: { src: '/games/rockpush/breakable-rock.png' },
    collision: 'solid',
  },
  pushableBoulder: {
    id: 'pushable-boulder',
    name: 'Pushable Boulder',
    purpose: 'pushable',
    size: { cols: 1, rows: 1 },
    asset: { src: '/games/rockpush/boulder.avif' },
    collision: 'pushable',
  },
  battleTrigger: {
    id: 'battle-trigger',
    name: 'Battle Trigger',
    purpose: 'battle-trigger',
    size: { cols: 1, rows: 1 },
    asset: { src: '/games/rockpush/trainer.avif' },
    collision: 'none',
    interaction: 'battle',
  },
  bugCatcherTrainer: {
    id: 'bug-catcher-trainer',
    name: 'Bug Catcher',
    purpose: 'battle-trigger',
    size: { cols: 1, rows: 1 },
    asset: { src: '/games/grid-objects/bug-catcher-trainer.svg' },
    collision: 'none',
    interaction: 'battle',
  },
  birdKeeperTrainer: {
    id: 'bird-keeper-trainer',
    name: 'Bird Keeper',
    purpose: 'battle-trigger',
    size: { cols: 1, rows: 1 },
    asset: { src: '/games/grid-objects/bird-keeper-trainer.svg' },
    collision: 'none',
    interaction: 'battle',
  },
  wildBattleTrigger: {
    id: 'wild-battle-trigger',
    name: 'Wild Battle Trigger',
    purpose: 'battle-trigger',
    size: { cols: 1, rows: 1 },
    asset: { src: '/sprites/pokemon/gen-v/front/normal/666-poke-ball.avif' },
    collision: 'none',
    interaction: 'battle',
  },
  route1RattataTrigger: {
    id: 'route-1-rattata-trigger',
    name: 'Route 1 Rattata',
    purpose: 'battle-trigger',
    size: { cols: 1, rows: 1 },
    asset: { src: '/sprites/pokemon/gen-v/front/normal/19.avif' },
    collision: 'none',
    interaction: 'battle',
  },
  route1PidgeyTrigger: {
    id: 'route-1-pidgey-trigger',
    name: 'Route 1 Pidgey',
    purpose: 'battle-trigger',
    size: { cols: 1, rows: 1 },
    asset: { src: '/sprites/pokemon/gen-v/front/normal/16.avif' },
    collision: 'none',
    interaction: 'battle',
  },
  encounterTrigger: {
    id: 'encounter-trigger',
    name: 'Encounter Trigger',
    purpose: 'encounter-trigger',
    size: { cols: 1, rows: 1 },
    asset: { src: '/sprites/pokemon/gen-v/front/normal/666-poke-ball.avif' },
    collision: 'none',
    interaction: 'encounter',
  },
  minigameTrigger: {
    id: 'minigame-trigger',
    name: 'Mini-game Trigger',
    purpose: 'minigame-trigger',
    size: { cols: 1, rows: 1 },
    asset: { src: '/games/underground-mining/pickaxe.avif' },
    collision: 'none',
    interaction: 'minigame',
  },
  celadonSlotMachine: {
    id: 'celadon-slot-machine',
    name: 'Celadon Slot Machine',
    purpose: 'minigame-trigger',
    size: { cols: 1, rows: 1 },
    asset: { src: '/games/grid-objects/celadon-slot-machine.png' },
    collision: 'none',
    interaction: 'minigame',
  },
  celadonHighStakesSlotMachine: {
    id: 'celadon-high-stakes-slot-machine',
    name: 'High Stakes Celadon Slot Machine',
    purpose: 'minigame-trigger',
    size: { cols: 1, rows: 1 },
    asset: { src: '/games/grid-objects/celadon-lucky-slot-machine.png' },
    collision: 'none',
    interaction: 'minigame',
  },
  celadonPachinkoMachine: {
    id: 'celadon-pachinko-machine',
    name: 'Celadon Pachinko Machine',
    purpose: 'minigame-trigger',
    size: { cols: 1, rows: 1 },
    asset: { src: '/games/grid-objects/celadon-pachinko-machine.png' },
    collision: 'none',
    interaction: 'minigame',
  },
  celadonHighStakesPachinkoMachine: {
    id: 'celadon-high-stakes-pachinko-machine',
    name: 'High Stakes Celadon Pachinko Machine',
    purpose: 'minigame-trigger',
    size: { cols: 1, rows: 1 },
    asset: { src: '/games/grid-objects/celadon-high-stakes-pachinko-machine.png' },
    collision: 'none',
    interaction: 'minigame',
  },
  gamePlazaMatch3Cabinet: {
    id: 'game-plaza-match3-cabinet',
    name: 'Game Plaza Match 3 Cabinet',
    purpose: 'minigame-trigger',
    size: { cols: 1, rows: 1 },
    asset: { src: '/games/grid-objects/game-plaza-match3-cabinet.png' },
    collision: 'none',
    interaction: 'minigame',
  },
  gamePlazaPrizeWheel: {
    id: 'game-plaza-prize-wheel',
    name: 'Game Plaza Prize Wheel',
    purpose: 'minigame-trigger',
    size: { cols: 1, rows: 1 },
    asset: { src: '/games/grid-objects/game-plaza-prize-wheel.png' },
    collision: 'none',
    interaction: 'minigame',
  },
  gamePlazaUfoCatcher: {
    id: 'game-plaza-ufo-catcher',
    name: 'Game Plaza UFO Catcher',
    purpose: 'minigame-trigger',
    size: { cols: 1, rows: 1 },
    asset: { src: '/games/grid-objects/game-plaza-ufo-catcher.png' },
    collision: 'none',
    interaction: 'minigame',
  },
  gamePlazaHighStakesMatch3Cabinet: {
    id: 'game-plaza-high-stakes-match3-cabinet',
    name: 'High Stakes Game Plaza Match 3 Cabinet',
    purpose: 'minigame-trigger',
    size: { cols: 1, rows: 1 },
    asset: {
      src: '/games/grid-objects/game-plaza-match3-cabinet-high-stakes.png',
    },
    collision: 'none',
    interaction: 'minigame',
  },
  gamePlazaHighStakesPrizeWheel: {
    id: 'game-plaza-high-stakes-prize-wheel',
    name: 'High Stakes Game Plaza Prize Wheel',
    purpose: 'minigame-trigger',
    size: { cols: 1, rows: 1 },
    asset: {
      src: '/games/grid-objects/game-plaza-prize-wheel-high-stakes.png',
    },
    collision: 'none',
    interaction: 'minigame',
  },
  gamePlazaHighStakesUfoCatcher: {
    id: 'game-plaza-high-stakes-ufo-catcher',
    name: 'High Stakes Game Plaza UFO Catcher',
    purpose: 'minigame-trigger',
    size: { cols: 1, rows: 1 },
    asset: {
      src: '/games/grid-objects/game-plaza-ufo-catcher-high-stakes.png',
    },
    collision: 'none',
    interaction: 'minigame',
  },
  fieldResearchTrigger: {
    id: 'field-research-trigger',
    name: 'Field Research Trigger',
    purpose: 'field-research-trigger',
    size: { cols: 1, rows: 1 },
    asset: { src: '/sprites/trainers/special/oak.avif' },
    collision: 'none',
    interaction: 'field-research',
  },
} satisfies GridObjectLibrary

/**
 * Resolve a shared object by its stable authored id.
 *
 * Libraries are often authored with ergonomic property names (for example
 * `battleTrigger`) while map placements use the serialized `id`
 * (`battle-trigger`). Looking up by both keeps the registry pleasant to use
 * in code without making placement ids depend on object property names.
 */
export function getGridObjectDefinition(
  library: GridObjectLibrary,
  objectId: string,
): GridObjectDefinition | undefined {
  return (
    library[objectId] ||
    Object.values(library).find((object) => object.id === objectId)
  )
}
