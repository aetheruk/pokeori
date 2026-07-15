import type { CollectionConfig } from 'payload'
import { skills } from '../data/skills/index'
import superAdminCheck, { adminOrSelf } from '@/utilities/access'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: {
    tokenExpiration: 7200, // 2 hours
  },
  access: {
    admin: superAdminCheck,
    create: () => true,
    read: adminOrSelf,
    update: adminOrSelf,
    delete: superAdminCheck,
  },
  fields: [
    {
      name: 'isAdmin',
      type: 'checkbox',
      defaultValue: false,
      label: 'Is Admin',
      access: {},
    },
    {
      name: 'trainerName',
      type: 'text',
      required: true,
      unique: true,
    },
    // User Customization - Active selection
    {
      name: 'banner',
      type: 'text',
      defaultValue: 'lab',
      admin: {
        description: 'Currently active banner ID',
      },
    },
    {
      name: 'icon',
      type: 'text',
      defaultValue: 'ditto',
      admin: {
        description: 'Currently active profile icon ID',
      },
    },
    {
      name: 'title',
      type: 'text',
      defaultValue: 'new-beginnings',
      admin: {
        description: 'Currently active title ID',
      },
    },
    // User Customization - Unlocked items
    {
      name: 'unlockedBanners',
      type: 'json',
      defaultValue: ['lab'],
      admin: {
        description: 'Array of unlocked banner IDs',
      },
    },
    {
      name: 'unlockedIcons',
      type: 'json',
      defaultValue: ['ditto', 'trainer-red', 'trainer-leaf'],
      admin: {
        description: 'Array of unlocked icon IDs',
      },
    },
    {
      name: 'unlockedTitles',
      type: 'json',
      defaultValue: ['new-beginnings'],
      admin: {
        description: 'Array of unlocked title IDs',
      },
    },
    {
      name: 'skills',
      type: 'group',
      fields: skills.map((skill) => ({
        name: skill.id,
        type: 'group',
        fields: [
          {
            name: 'level',
            type: 'number',
            defaultValue: 1,
          },
          {
            name: 'exp',
            type: 'number',
            defaultValue: 0,
          },
        ],
      })),
    },
    {
      name: 'currency',
      type: 'group',
      fields: [
        {
          name: 'crystals',
          type: 'number',
          defaultValue: 0,
        },
        {
          name: 'mega-shards',
          type: 'number',
          defaultValue: 0,
        },
        {
          name: 'pokedollars',
          type: 'number',
          defaultValue: 0,
        },
        {
          name: 'battle-points',
          type: 'number',
          defaultValue: 0,
        },
        {
          name: 'berry-powder',
          type: 'number',
          defaultValue: 0,
        },
        {
          name: 'prof-scrip',
          type: 'number',
          defaultValue: 0,
        },
        {
          name: 'league-ticket',
          type: 'number',
          defaultValue: 0,
        },
      ],
    },
    {
      name: 'maxPokemon',
      type: 'number',
      defaultValue: 50,
      admin: {
        description: 'Maximum number of Pokemon this user can hold',
      },
    },
    {
      name: 'maxBoxes',
      type: 'number',
      defaultValue: 5,
      admin: {
        description: 'Maximum number of boxes this user can create',
      },
    },
    {
      name: 'boxes',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'kidMode',
      type: 'checkbox',
      defaultValue: false,
      label: 'Kid Mode',
      admin: {
        description: 'Enable simplified UI for kids (e.g. sprites instead of text in quizzes)',
      },
    },
    {
      name: 'powerUsage',
      type: 'group',
      label: 'Power Usage Statistics',
      fields: [
        {
          name: 'teraUses',
          type: 'number',
          defaultValue: 0,
          label: 'Tera Uses',
          admin: {
            description: 'Number of times Tera has been used',
          },
        },
        {
          name: 'megaEvolutionUses',
          type: 'number',
          defaultValue: 0,
          label: 'Mega Evolution Uses',
          admin: {
            description: 'Number of times Mega Evolution has been used',
          },
        },
        {
          name: 'zMoveUses',
          type: 'number',
          defaultValue: 0,
          label: 'Z-Move Uses',
          admin: {
            description: 'Number of times Z-Moves have been used',
          },
        },
        {
          name: 'dynamaxUses',
          type: 'number',
          defaultValue: 0,
          label: 'Dynamax Uses',
          admin: {
            description: 'Number of times Dynamax has been used',
          },
        },
        {
          name: 'shoutUses',
          type: 'number',
          defaultValue: 0,
          label: 'Shout Uses',
          admin: {
            description: 'Number of times Shouts have been used',
          },
        },
        {
          name: 'victoryUses',
          type: 'number',
          defaultValue: 0,
          label: 'Victory Uses',
          admin: {
            description: 'Number of times Victory Power has been used',
          },
        },
        {
          name: 'weatherUses',
          type: 'number',
          defaultValue: 0,
          label: 'Weather Uses',
          admin: {
            description: 'Number of times Weather Control has been used',
          },
        },
        {
          name: 'circadianUses',
          type: 'number',
          defaultValue: 0,
          label: 'Circadian Uses',
          admin: {
            description: 'Number of times Circadian Power has been used',
          },
        },
        {
          name: 'dimensionalShiftUses',
          type: 'number',
          defaultValue: 0,
          label: 'Dimensional Shift Uses',
          admin: { description: 'Number of times Dimensional Shift has been used' },
        },
      ],
    },
    // Email added by default
    // Add more fields as needed
    {
      name: 'stats',
      type: 'json',
      defaultValue: {
        battles: {},
        research: {},
        locations: {},
        totalEvolutions: 0,
      },
      admin: {
        description: 'Battle, Research, and Location statistics',
      },
    },
    {
      name: 'lastDailyRefresh',
      type: 'date',
      admin: {
        description: 'Last time the random daily tasks were generated',
      },
    },
    {
      name: 'activeDailyTasks',
      type: 'json',
      defaultValue: [],
      admin: {
        description: 'Array of dynamically generated daily Task objects for today',
      },
    },
    {
      name: 'tcgDecks',
      type: 'json',
      defaultValue: {},
      admin: {
        description: 'Saved TCG battle decks by format',
      },
    },
    {
      name: 'tcgDecksByGeneration',
      type: 'json',
      defaultValue: {},
      admin: {
        description: 'Saved TCG battle decks grouped by generation series, each with baby/champions/masters.',
      },
    },
    {
      name: 'pokemon',
      type: 'join',
      collection: 'pokemon',
      on: 'user',
    },
    {
      name: 'redeemedCodes',
      type: 'json',
      defaultValue: [],
      admin: {
        description: 'List of redeemed mystery gift codes',
      },
    },
    {
      name: 'friends',
      type: 'json',
      defaultValue: [],
      admin: {
        description: 'Array of user IDs who are confirmed friends',
      },
    },
    {
      name: 'friendRequests',
      type: 'json',
      defaultValue: [],
      admin: {
        description: 'Friend request tracking with status',
      },
    },
    {
      name: 'rivalTrainerId',
      type: 'text',
      admin: {
        description: "User ID of the trainer selected as this player's rival",
      },
    },
    {
      name: 'activeVoyages',
      type: 'array',
      fields: [
        { name: 'voyageId', type: 'text' },
        { name: 'startTime', type: 'date' },
        { name: 'endTime', type: 'date' },
        { name: 'pokemonIds', type: 'json' }, // Ensure this matches previous structure logic if it was missing from Group def but present in Types
      ],
    },
    {
      name: 'voyageStats',
      type: 'group',
      fields: [
        {
          name: 'totalCompleted',
          type: 'number',
          defaultValue: 0,
        },
        {
          name: 'completedVoyages',
          type: 'json', // Map of voyageId -> count
          defaultValue: {},
        },
      ],
    },
    {
      name: 'lastRoll',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Random roll used for event requirements (0-1,000,000)',
      },
    },
    {
      name: 'weatherSlot',
      type: 'number',
      defaultValue: 0,
      min: 0,
      max: 20,
      admin: {
        description: 'Current weather slot for sub-region weather mapping (1-20)',
      },
    },
    {
      name: 'weatherUpdatedAt',
      type: 'date',
      admin: {
        description: 'When the current weather slot was last rolled',
      },
    },
  ],
}
