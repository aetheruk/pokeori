import type { GuildDefinition } from './types'

const marker = (targetId: string) => ({
  type: 'task_complete' as const,
  targetId,
  quantity: 1,
  dropChance: 100,
  secret: true,
  suppressExitModal: true,
})

export const fuchsiaResearchGuild: GuildDefinition = {
  id: 'fuchsia-research-guild',
  name: 'Fuchsia Research Institute',
  description:
    'Chart protected habitats, submit field notes, and rise through the Institute charter.',
  category: 'Kanto',
  subCategory: 'Fuchsia City',
  background: '/backgrounds/lab.avif',
  icon: { type: 'item', id: 'safari-ball' },
  ranks: [
    {
      rank: 1,
      totalXp: 0,
      name: 'Chartered Researcher',
      description: 'A registered Institute member trusted to enter protected surveys.',
      icon: { type: 'item', id: 'researchers-journal-page' },
      unlocks: ['Institute membership and Researcher’s Pass'],
    },
    {
      rank: 2,
      totalXp: 100,
      name: 'Field Researcher',
      description: 'A permitted field researcher trusted with full-reserve survey work.',
      icon: { type: 'pokemon', id: '113' },
      unlocks: ['Safari Zone Grand Expedition eligibility'],
    },
    {
      rank: 3,
      totalXp: 250,
      name: 'Surveyor',
      description: 'A dependable recorder of habitat conditions.',
      icon: { type: 'pokemon', id: '127' },
      unlocks: ['Four short habitat surveys', 'Extra Habitat Field Notes', 'Stamina Notes I'],
      rewards: [
        marker('safari-extra-habitat-field-notes'),
        marker('safari-stamina-notes'),
      ],
    },
    {
      rank: 4,
      totalXp: 500,
      name: 'Habitat Specialist',
      description: 'A researcher trusted with the reserve archive.',
      icon: { type: 'item', id: 'metal-scrap-t1' },
      unlocks: ['Material Deposit Reports', 'Safari Ball Cache Info', 'Stamina Notes II'],
      rewards: [
        marker('safari-material-deposit-reports'),
        marker('safari-ball-cache-info'),
        marker('safari-stamina-notes'),
      ],
    },
    {
      rank: 5,
      totalXp: 900,
      name: 'Senior Researcher',
      description: 'A specialist able to support rangers in sensitive habitats.',
      icon: { type: 'trainer', id: 'rocket-grunt-m' },
      unlocks: ['Unusual Pokémon Sightings', 'Security Permit and Poacher Watch', 'Stamina Notes III'],
      rewards: [
        marker('safari-unusual-pokemon-sightings'),
        marker('safari-notes-on-poachers'),
        marker('safari-stamina-notes'),
      ],
    },
    {
      rank: 6,
      totalXp: 1550,
      name: 'Research Fellow',
      description: 'A senior member entrusted with specialist field records.',
      icon: { type: 'pokemon', id: '147' },
      unlocks: ['Fishing Permit', 'Rare Item Rumours', 'Stamina Notes IV'],
      rewards: [
        marker('safari-fishing-research-notes'),
        marker('safari-rare-item-rumours'),
        marker('safari-stamina-notes'),
      ],
    },
    {
      rank: 7,
      totalXp: 2550,
      name: 'Lead Researcher',
      description: 'An experienced fellow licensed for focused catching studies.',
      icon: { type: 'pokemon', id: '123' },
      unlocks: ['Catching Permit', 'Stamina Notes V'],
      rewards: [
        marker('safari-wardens-permit'),
        marker('safari-stamina-notes'),
      ],
    },
    {
      rank: 8,
      totalXp: 4150,
      name: 'Principal Researcher',
      description: 'A lead researcher briefed on the reserve’s strangest sightings.',
      icon: { type: 'pokemon', id: '128' },
      unlocks: ['Strange Sightings'],
      rewards: [marker('safari-strange-sightings')],
    },
    {
      rank: 9,
      totalXp: 6500,
      name: 'Deputy Warden',
      description: 'A principal researcher recognized as a trusted deputy of the reserve.',
      icon: { type: 'item', id: 'safari-ball' },
      unlocks: ['Safari Ball profile icon', 'Deputy Warden recognition'],
      rewards: [
        {
          type: 'icon',
          targetId: 'safari-ball',
          quantity: 1,
          dropChance: 100,
        },
      ],
    },
    {
      rank: 10,
      totalXp: 10000,
      name: 'Warden',
      description: 'The Institute’s highest field honour.',
      icon: { type: 'item', id: 'researchers-journal-page' },
      unlocks: ['The Warden title', 'Completed Institute status'],
      rewards: [
        {
          type: 'title',
          targetId: 'the-warden',
          quantity: 1,
          dropChance: 100,
        },
      ],
    },
  ],
}
