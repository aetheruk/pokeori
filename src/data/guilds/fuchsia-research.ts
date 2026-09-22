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
  name: 'Fuchsia Research Guild',
  description:
    'Chart protected habitats, submit field notes, and rise through the Institute charter.',
  category: 'Kanto',
  subCategory: 'Safari Zone',
  background: '/backgrounds/safari-reserve.avif',
  icon: { type: 'item', id: 'researchers-journal-page' },
  ranks: [
    {
      rank: 1,
      totalXp: 0,
      name: 'Chartered Researcher',
      description: 'A registered Institute member trusted to enter protected surveys.',
      unlocks: ['Safari Zone Grand Expedition eligibility'],
    },
    {
      rank: 2,
      totalXp: 100,
      name: 'Field Researcher',
      description: 'A dependable recorder of habitat conditions.',
      unlocks: ['Four short habitat surveys', 'Extra Habitat Field Notes', 'Stamina Notes I'],
      rewards: [
        marker('safari-extra-habitat-field-notes'),
        marker('safari-stamina-notes'),
      ],
    },
    {
      rank: 3,
      totalXp: 250,
      name: 'Surveyor',
      description: 'A researcher trusted with the reserve archive.',
      unlocks: ['Material Deposit Reports', 'Safari Ball Cache Info'],
      rewards: [
        marker('safari-material-deposit-reports'),
        marker('safari-ball-cache-info'),
      ],
    },
    {
      rank: 4,
      totalXp: 500,
      name: 'Habitat Specialist',
      description: 'A specialist able to support rangers in sensitive habitats.',
      unlocks: ['Unusual Pokémon Sightings', 'Security Permit and Poacher Watch', 'Stamina Notes II'],
      rewards: [
        marker('safari-unusual-pokemon-sightings'),
        marker('safari-notes-on-poachers'),
        marker('safari-stamina-notes'),
      ],
    },
    {
      rank: 5,
      totalXp: 900,
      name: 'Senior Researcher',
      description: 'A senior member entrusted with specialist field records.',
      unlocks: ['Fishing Permit', 'Rare Item Rumours'],
      rewards: [
        marker('safari-fishing-research-notes'),
        marker('safari-rare-item-rumours'),
      ],
    },
    {
      rank: 6,
      totalXp: 1550,
      name: 'Research Fellow',
      description: 'An experienced fellow licensed for focused catching studies.',
      unlocks: ['Catching Permit', 'Stamina Notes III'],
      rewards: [
        marker('safari-wardens-permit'),
        marker('safari-stamina-notes'),
      ],
    },
    {
      rank: 7,
      totalXp: 2550,
      name: 'Lead Researcher',
      description: 'A lead researcher briefed on the reserve’s strangest sightings.',
      unlocks: ['Strange Sightings', 'Stamina Notes IV'],
      rewards: [
        marker('safari-strange-sightings'),
        marker('safari-stamina-notes'),
      ],
    },
    {
      rank: 8,
      totalXp: 4150,
      name: 'Principal Researcher',
      description: 'A principal researcher with the Institute’s full endurance guidance.',
      unlocks: ['Stamina Notes V'],
      rewards: [marker('safari-stamina-notes')],
    },
    {
      rank: 9,
      totalXp: 6500,
      name: 'Deputy Warden',
      description: 'A trusted deputy whose service is recognized across the reserve.',
      unlocks: ['Safari Ball profile icon'],
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
      unlocks: ['The Warden title', 'Completed guild status'],
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
