import type { CollectionConfig } from 'payload'
import superAdminCheck, { adminOrUserOwned } from '@/utilities/access'

export const Pokemon: CollectionConfig = {
  slug: 'pokemon',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    admin: superAdminCheck,
    create: superAdminCheck,
    read: adminOrUserOwned,
    update: adminOrUserOwned,
    delete: adminOrUserOwned,
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      hasMany: false,
    },
    {
      name: 'originalTrainer',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      hasMany: false,
    },
    {
      name: 'friendship',
      type: 'number',
      defaultValue: 70,
      min: 0,
      max: 255,
    },
    {
      name: 'name',
      type: 'text',
      label: 'Nickname',
    },
    {
      name: 'speciesId',
      type: 'number',
      required: true,
      min: 1,
    },
    {
      name: 'formId',
      type: 'text',
      required: true,
    },
    {
      name: 'ability',
      type: 'text',
      label: 'Ability',
    },
    {
      name: 'assignedMoves',
      type: 'array',
      label: 'Assigned Battle Moves',
      maxRows: 4,
      fields: [
        {
          name: 'moveId',
          type: 'text',
          required: true,
        },
      ],
      admin: {
        description:
          'Up to four eligible battle moves selected from owned move-granting TMs/HMs.',
      },
    },
    {
      name: 'selectedPokemonPower',
      type: 'select',
      label: 'Selected Pokemon Power',
      options: [
        { label: 'Terastallization', value: 'tera' },
        { label: 'Mega Evolution', value: 'mega' },
        { label: 'Z-Move', value: 'z-move' },
        { label: 'Dynamax', value: 'dynamax' },
        { label: 'Victory Power', value: 'victory' },
        { label: 'Weather Control', value: 'weather' },
        { label: 'Battle Shout', value: 'shout' },
        { label: 'Circadian Power', value: 'circadian' },
        { label: 'Dimensional Shift', value: 'dimensional-shift' },
      ],
      admin: {
        description:
          'The only battle power this Pokemon can use. Leave empty to disable Pokemon Power usage.',
      },
    },
    {
      name: 'teraType',
      type: 'select',
      label: 'Tera Type',
      options: [
        { label: 'Normal', value: 'normal' },
        { label: 'Fire', value: 'fire' },
        { label: 'Water', value: 'water' },
        { label: 'Electric', value: 'electric' },
        { label: 'Grass', value: 'grass' },
        { label: 'Ice', value: 'ice' },
        { label: 'Fighting', value: 'fighting' },
        { label: 'Poison', value: 'poison' },
        { label: 'Ground', value: 'ground' },
        { label: 'Flying', value: 'flying' },
        { label: 'Psychic', value: 'psychic' },
        { label: 'Bug', value: 'bug' },
        { label: 'Rock', value: 'rock' },
        { label: 'Ghost', value: 'ghost' },
        { label: 'Dragon', value: 'dragon' },
        { label: 'Dark', value: 'dark' },
        { label: 'Steel', value: 'steel' },
        { label: 'Fairy', value: 'fairy' },
      ],
      admin: {
        description:
          'Battle type applied by the Tera Orb. Tera Shards set this outside battle.',
      },
    },
    {
      name: 'heldItemId',
      type: 'text',
      label: 'Held Item ID',
      admin: {
        description:
          'Inventory item currently held by this Pokemon. Held items are assigned from the Pokemon details modal.',
      },
    },
    {
      name: 'itemCharge',
      type: 'number',
      label: 'Held Item Charge',
      defaultValue: 0,
      min: 0,
      max: 100,
      admin: {
        description:
          'Persistent percentage charge for held items that build energy through battle triggers.',
      },
    },
    {
      name: 'fusionItemId',
      type: 'text',
      label: 'Fusion Item ID',
      admin: {
        description:
          'Reusable key item that created the current fused form, when this Pokemon is fused.',
      },
    },
    {
      name: 'fusionBaseFormId',
      type: 'text',
      label: 'Fusion Base Form ID',
      admin: {
        description: 'Original form to restore when this Pokemon is unfused.',
      },
    },
    {
      name: 'fusedWithPokemonId',
      type: 'text',
      label: 'Fused With Pokemon ID',
      admin: {
        description:
          'Owned Pokemon ID hidden inside this visible fused Pokemon.',
      },
    },
    {
      name: 'fusedIntoPokemonId',
      type: 'text',
      label: 'Fused Into Pokemon ID',
      index: true,
      admin: {
        description:
          'Visible fused Pokemon ID this Pokemon is currently fused into.',
      },
    },
    {
      name: 'level',
      type: 'number',
      required: true,
      min: 1,
      max: 100,
      defaultValue: 0,
    },
    {
      name: 'battleKOs',
      type: 'number',
      label: 'Battle KOs',
      defaultValue: 0,
      min: 0,
      admin: {
        description:
          'Number of opposing Pokemon this Pokemon has knocked out in battles.',
      },
    },
    {
      name: 'stats',
      type: 'group',
      fields: [
        { name: 'hp', type: 'number', defaultValue: 0 },
        { name: 'attack', type: 'number', defaultValue: 0 },
        { name: 'defense', type: 'number', defaultValue: 0 },
        { name: 'specialAttack', type: 'number', defaultValue: 0 },
        { name: 'specialDefense', type: 'number', defaultValue: 0 },
        { name: 'speed', type: 'number', defaultValue: 0 },
      ],
    },
    {
      name: 'ivs',
      type: 'group',
      label: 'Individual Values (IVs)',
      fields: [
        { name: 'hp', type: 'number', min: 0, max: 31, defaultValue: 0 },
        { name: 'attack', type: 'number', min: 0, max: 31, defaultValue: 0 },
        { name: 'defense', type: 'number', min: 0, max: 31, defaultValue: 0 },
        {
          name: 'specialAttack',
          type: 'number',
          min: 0,
          max: 31,
          defaultValue: 0,
        },
        {
          name: 'specialDefense',
          type: 'number',
          min: 0,
          max: 31,
          defaultValue: 0,
        },
        { name: 'speed', type: 'number', min: 0, max: 31, defaultValue: 0 },
      ],
    },
    {
      name: 'evs',
      type: 'group',
      label: 'Effort Values (EVs)',
      fields: [
        { name: 'hp', type: 'number', min: 0, max: 255, defaultValue: 0 },
        { name: 'attack', type: 'number', min: 0, max: 255, defaultValue: 0 },
        { name: 'defense', type: 'number', min: 0, max: 255, defaultValue: 0 },
        {
          name: 'specialAttack',
          type: 'number',
          min: 0,
          max: 255,
          defaultValue: 0,
        },
        {
          name: 'specialDefense',
          type: 'number',
          min: 0,
          max: 255,
          defaultValue: 0,
        },
        { name: 'speed', type: 'number', min: 0, max: 255, defaultValue: 0 },
      ],
    },
    {
      name: 'nature',
      type: 'text',
    },
    {
      name: 'identified',
      type: 'checkbox',
      defaultValue: false,
      label: 'Identified',
    },
    {
      name: 'shiny',
      type: 'checkbox',
      defaultValue: false,
      label: 'Shiny',
    },
    {
      name: 'gender',
      type: 'select',
      label: 'Gender',
      defaultValue: 'male',
      options: [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
        { label: 'Genderless', value: 'genderless' },
      ],
    },
    {
      name: 'isShadow',
      type: 'checkbox',
      defaultValue: false,
      label: 'Shadow Pokemon',
    },
    {
      name: 'isRadiant',
      type: 'checkbox',
      defaultValue: false,
      label: 'Radiant Pokemon',
    },
    {
      name: 'evolved',
      type: 'checkbox',
      defaultValue: false,
      label: 'Evolved',
    },
    {
      name: 'height',
      type: 'number',
      label: 'Height',
    },
    {
      name: 'weight',
      type: 'number',
      label: 'Weight',
    },
    {
      name: 'markingSquare',
      type: 'checkbox',
      label: 'Marking: Square',
    },
    {
      name: 'markingCircle',
      type: 'checkbox',
      label: 'Marking: Circle',
    },
    {
      name: 'markingTriangle',
      type: 'checkbox',
      label: 'Marking: Triangle',
    },
    {
      name: 'markingDiamond',
      type: 'checkbox',
      label: 'Marking: Diamond',
    },
    {
      name: 'ballType',
      type: 'text',
      label: 'Poké Ball Type',
    },
    {
      name: 'obtainedMethod',
      type: 'select',
      label: 'Obtained Method',
      options: [
        { label: 'Caught', value: 'caught' },
        { label: 'Trade', value: 'trade' },
        { label: 'Gift', value: 'gift' },
        { label: 'Starter', value: 'starter' },
        { label: 'Purchased', value: 'purchased' },
        { label: 'Reward', value: 'reward' },
        { label: 'Hatched', value: 'hatched' },
      ],
      admin: {
        description: 'How this Pokemon was originally obtained.',
      },
    },
    {
      name: 'obtainedRegion',
      type: 'text',
      label: 'Obtained Region',
    },
    {
      name: 'obtainedLocation',
      type: 'text',
      label: 'Obtained Location',
    },
    {
      name: 'obtainedSourceId',
      type: 'text',
      label: 'Obtained Source ID',
      admin: {
        description:
          'Source activity/task/location ID that granted this Pokemon.',
      },
    },
    {
      name: 'boxId',
      type: 'text',
      label: 'Box ID',
      index: true,
    },
    {
      name: 'locked',
      type: 'checkbox',
      label: 'Locked',
    },
    {
      name: 'size',
      type: 'select',
      options: [
        { label: 'XS', value: 'XS' },
        { label: 'S', value: 'S' },
        { label: 'L', value: 'L' },
        { label: 'XL', value: 'XL' },
      ],
      label: 'Size',
    },
    {
      name: 'partner',
      type: 'checkbox',
      label: 'Partner Pokemon',
      defaultValue: false,
    },
    {
      name: 'onBattleTeam',
      type: 'checkbox',
      label: 'On Battle Team',
      defaultValue: false,
      index: true,
    },
    {
      name: 'battleTeamPosition',
      type: 'number',
      label: 'Battle Team Position',
      min: 1,
      max: 6,
    },
    {
      name: 'isCompanion',
      type: 'checkbox',
      label: 'Is Companion Pokemon',
      defaultValue: false,
      index: true,
    },
    {
      name: 'background',
      type: 'text',
      label: 'Background Image',
    },
  ],
}
