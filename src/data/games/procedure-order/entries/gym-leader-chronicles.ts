import type { ProcedureOrderGameConfig } from '../types'

export const gymLeaderChronicleProcedureOrderEntries: ProcedureOrderGameConfig[] = [
  {
    id: 'chronicle-v2-brock-share-the-morning',
    name: 'Share the Morning',
    description:
      'Put the Harrison household morning in a safe order without pretending Brock can do every job alone.',
    category: 'Secret',
    subCategory: 'Brock Chronicle',
    icon: { type: 'trainer', id: 'gym-kanto-brock' },
    background: '/backgrounds/chronicle-brock-family-kitchen.avif',
    requirements: [
      { type: 'task_completed', targetId: 'boulder-badge-memory-revealed' },
    ],
    criteria: [],
    rewards: [],
    settings: {
      cards: [
        { id: 'wake-forrest', label: 'Wake Forrest', icon: { type: 'trainer', id: 'chronicle-forrest' } },
        { id: 'check-medicine', label: 'Check the medicine', icon: { type: 'item', id: 'potion' } },
        { id: 'heat-breakfast', label: 'Heat breakfast', icon: { type: 'item', id: 'fresh-water' } },
        { id: 'serve-breakfast', label: 'Serve breakfast', icon: { type: 'item', id: 'pecha-berry' } },
        { id: 'feed-geodude', label: 'Feed Geodude', icon: { type: 'pokemon', id: '74' } },
        { id: 'check-school-bags', label: 'Check the school bags', icon: { type: 'trainer', id: 'twins' } },
        { id: 'pack-lunches', label: 'Pack the lunches', icon: { type: 'item', id: 'fresh-water' } },
        { id: 'leave-for-school', label: 'Send everyone to school', icon: { type: 'trainer', id: 'youngster' } },
      ],
      timeLimit: 90,
      maxSubmissions: 3,
      themeColour: '#5f794f',
      background: '/backgrounds/chronicle-brock-family-kitchen.avif',
    },
  },
  {
    id: 'chronicle-v2-erika-prepare-sumis-fragrance',
    name: "Prepare Sumi's Fragrance",
    description:
      'Follow the safe dependencies in the fragrance method Sumi and Erika developed together.',
    category: 'Secret',
    subCategory: 'Erika Chronicle',
    icon: { type: 'pokemon', id: '44' },
    background: '/backgrounds/chronicle-erika-greenhouse.avif',
    requirements: [
      { type: 'task_completed', targetId: 'rainbow-badge-memory-revealed' },
    ],
    criteria: [],
    rewards: [],
    settings: {
      cards: [
        { id: 'inspect-petals', label: 'Inspect the petals', icon: { type: 'pokemon', id: '43' } },
        { id: 'rinse-petals', label: 'Rinse the petals', icon: { type: 'item', id: 'fresh-water' } },
        { id: 'sterilise-vial', label: 'Sterilise the vial', icon: { type: 'item', id: 'burn-heal' } },
        { id: 'bruise-petals', label: 'Bruise the petals', icon: { type: 'pokemon', id: '114' } },
        { id: 'measure-oil', label: 'Measure the carrier oil', icon: { type: 'item', id: 'potion' } },
        { id: 'steep-petals', label: 'Steep the petals', icon: { type: 'pokemon', id: '44' } },
        { id: 'filter-extract', label: 'Filter the extract', icon: { type: 'item', id: 'antidote' } },
        { id: 'label-sumis-formula', label: "Label Sumi's formula", icon: { type: 'trainer', id: 'chronicle-sumi' } },
      ],
      timeLimit: 100,
      maxSubmissions: 3,
      themeColour: '#5f794f',
      background: '/backgrounds/chronicle-erika-greenhouse.avif',
    },
  },
  {
    id: 'chronicle-v2-blaine-emergency-shutdown',
    name: 'Emergency Shutdown',
    description:
      'Carry out the laboratory shutdown without venting heat into an occupied corridor.',
    category: 'Secret',
    subCategory: 'Blaine Chronicle',
    icon: { type: 'trainer', id: 'gym-kanto-blaine' },
    background: '/backgrounds/chronicle-blaine-cinnabar-lab.avif',
    requirements: [
      { type: 'task_completed', targetId: 'volcano-badge-memory-revealed' },
    ],
    criteria: [],
    rewards: [],
    settings: {
      cards: [
        { id: 'sound-alarm', label: 'Sound the alarm', icon: { type: 'item', id: 'escape-rope' } },
        { id: 'clear-corridor', label: 'Clear the corridor', icon: { type: 'trainer', id: 'chronicle-nami' } },
        { id: 'cut-fuel-feed', label: 'Cut the fuel feed', icon: { type: 'item', id: 'burn-heal' } },
        { id: 'seal-fire-door', label: 'Seal the fire door', icon: { type: 'pokemon', id: '58' } },
        { id: 'vent-chamber', label: 'Vent the chamber', icon: { type: 'pokemon', id: '126' } },
        { id: 'cool-containment', label: 'Cool containment', icon: { type: 'item', id: 'fresh-water' } },
        { id: 'check-pokemon', label: 'Check every Pokémon', icon: { type: 'pokemon', id: '77' } },
        { id: 'record-readings', label: 'Record the final readings', icon: { type: 'trainer', id: 'chronicle-orin' } },
      ],
      timeLimit: 100,
      maxSubmissions: 3,
      themeColour: '#b86148',
      background: '/backgrounds/chronicle-blaine-cinnabar-lab.avif',
    },
  },
]
