import { Item } from '../types'

export const vitaminItems: Item[] = [
  {
    id: 'hp-up',
    name: 'HP Up',
    description:
      'A nutritious drink for Pokémon. When consumed, it raises the base HP stat of a single Pokémon.',
    category: 'vitamin',
    effects: {
      increaseEv: {
        stat: 'hp',
        amount: 10,
      },
    },
  },
  {
    id: 'protein',
    name: 'Protein',
    description:
      'A nutritious drink for Pokémon. When consumed, it raises the base Attack stat of a single Pokémon.',
    category: 'vitamin',
    effects: {
      increaseEv: {
        stat: 'attack',
        amount: 10,
      },
    },
  },
  {
    id: 'iron',
    name: 'Iron',
    description:
      'A nutritious drink for Pokémon. When consumed, it raises the base Defense stat of a single Pokémon.',
    category: 'vitamin',
    effects: {
      increaseEv: {
        stat: 'defense',
        amount: 10,
      },
    },
  },
  {
    id: 'calcium',
    name: 'Calcium',
    description:
      'A nutritious drink for Pokémon. When consumed, it raises the base Sp. Atk stat of a single Pokémon.',
    category: 'vitamin',
    effects: {
      increaseEv: {
        stat: 'specialAttack',
        amount: 10,
      },
    },
  },
  {
    id: 'zinc',
    name: 'Zinc',
    description:
      'A nutritious drink for Pokémon. When consumed, it raises the base Sp. Def stat of a single Pokémon.',
    category: 'vitamin',
    effects: {
      increaseEv: {
        stat: 'specialDefense',
        amount: 10,
      },
    },
  },
  {
    id: 'carbos',
    name: 'Carbos',
    description:
      'A nutritious drink for Pokémon. When consumed, it raises the base Speed stat of a single Pokémon.',
    category: 'vitamin',
    effects: {
      increaseEv: {
        stat: 'speed',
        amount: 10,
      },
    },
  },
  // Feathers
  {
    id: 'health-feather',
    name: 'Health Feather',
    description: 'An item that raises the base HP stat of a single Pokémon.',
    category: 'vitamin',
    effects: {
      increaseEv: {
        stat: 'hp',
        amount: 1,
      },
    },
    spriteId: 'health-feather',
  },
  {
    id: 'muscle-feather',
    name: 'Muscle Feather',
    description: 'An item that raises the base Attack stat of a single Pokémon.',
    category: 'vitamin',
    effects: {
      increaseEv: {
        stat: 'attack',
        amount: 1,
      },
    },
    spriteId: 'muscle-feather',
  },
  {
    id: 'resist-feather',
    name: 'Resist Feather',
    description: 'An item that raises the base Defense stat of a single Pokémon.',
    category: 'vitamin',
    effects: {
      increaseEv: {
        stat: 'defense',
        amount: 1,
      },
    },
    spriteId: 'resist-feather',
  },
  {
    id: 'genius-feather',
    name: 'Genius Feather',
    description: 'An item that raises the base Sp. Atk stat of a single Pokémon.',
    category: 'vitamin',
    effects: {
      increaseEv: {
        stat: 'specialAttack',
        amount: 1,
      },
    },
    spriteId: 'genius-feather',
  },
  {
    id: 'clever-feather',
    name: 'Clever Feather',
    description: 'An item that raises the base Sp. Def stat of a single Pokémon.',
    category: 'vitamin',
    effects: {
      increaseEv: {
        stat: 'specialDefense',
        amount: 1,
      },
    },
    spriteId: 'clever-feather',
  },
  {
    id: 'swift-feather',
    name: 'Swift Feather',
    description: 'An item that raises the base Speed stat of a single Pokémon.',
    category: 'vitamin',
    effects: {
      increaseEv: {
        stat: 'speed',
        amount: 1,
      },
    },
    spriteId: 'swift-feather',
  },
  {
    id: 'pretty-feather',
    name: 'Pretty Feather',
    description: 'An item that raises the friendship of a single Pokémon.',
    category: 'vitamin',
    effects: {
      increaseFriendship: 1,
    },
    spriteId: 'pretty-feather',
  },
  // Mints
  {
    id: 'adamant-mint',
    name: 'Adamant Mint',
    description:
      'When a Pokémon smells this mint, its Attack will grow more easily, but its Sp. Atk will grow more slowly.',
    category: 'vitamin',
    effects: {
      changeNature: 'adamant',
    },
  },
  {
    id: 'bold-mint',
    name: 'Bold Mint',
    description:
      'When a Pokémon smells this mint, its Defense will grow more easily, but its Attack will grow more slowly.',
    category: 'vitamin',
    effects: {
      changeNature: 'bold',
    },
  },
  {
    id: 'brave-mint',
    name: 'Brave Mint',
    description:
      'When a Pokémon smells this mint, its Attack will grow more easily, but its Speed will grow more slowly.',
    category: 'vitamin',
    effects: {
      changeNature: 'brave',
    },
  },
  {
    id: 'calm-mint',
    name: 'Calm Mint',
    description:
      'When a Pokémon smells this mint, its Sp. Def will grow more easily, but its Attack will grow more slowly.',
    category: 'vitamin',
    effects: {
      changeNature: 'calm',
    },
  },
  {
    id: 'careful-mint',
    name: 'Careful Mint',
    description:
      'When a Pokémon smells this mint, its Sp. Def will grow more easily, but its Sp. Atk will grow more slowly.',
    category: 'vitamin',
    effects: {
      changeNature: 'careful',
    },
  },
  {
    id: 'gentle-mint',
    name: 'Gentle Mint',
    description:
      'When a Pokémon smells this mint, its Sp. Def will grow more easily, but its Defense will grow more slowly.',
    category: 'vitamin',
    effects: {
      changeNature: 'gentle',
    },
  },
  {
    id: 'hasty-mint',
    name: 'Hasty Mint',
    description:
      'When a Pokémon smells this mint, its Speed will grow more easily, but its Defense will grow more slowly.',
    category: 'vitamin',
    effects: {
      changeNature: 'hasty',
    },
  },
  {
    id: 'impish-mint',
    name: 'Impish Mint',
    description:
      'When a Pokémon smells this mint, its Defense will grow more easily, but its Sp. Atk will grow more slowly.',
    category: 'vitamin',
    effects: {
      changeNature: 'impish',
    },
  },
  {
    id: 'jolly-mint',
    name: 'Jolly Mint',
    description:
      'When a Pokémon smells this mint, its Speed will grow more easily, but its Sp. Atk will grow more slowly.',
    category: 'vitamin',
    effects: {
      changeNature: 'jolly',
    },
  },
  {
    id: 'lax-mint',
    name: 'Lax Mint',
    description:
      'When a Pokémon smells this mint, its Defense will grow more easily, but its Sp. Def will grow more slowly.',
    category: 'vitamin',
    effects: {
      changeNature: 'lax',
    },
  },
  {
    id: 'lonely-mint',
    name: 'Lonely Mint',
    description:
      'When a Pokémon smells this mint, its Attack will grow more easily, but its Defense will grow more slowly.',
    category: 'vitamin',
    effects: {
      changeNature: 'lonely',
    },
  },
  {
    id: 'mild-mint',
    name: 'Mild Mint',
    description:
      'When a Pokémon smells this mint, its Sp. Atk will grow more easily, but its Defense will grow more slowly.',
    category: 'vitamin',
    effects: {
      changeNature: 'mild',
    },
  },
  {
    id: 'modest-mint',
    name: 'Modest Mint',
    description:
      'When a Pokémon smells this mint, its Sp. Atk will grow more easily, but its Attack will grow more slowly.',
    category: 'vitamin',
    effects: {
      changeNature: 'modest',
    },
  },
  {
    id: 'naive-mint',
    name: 'Naive Mint',
    description:
      'When a Pokémon smells this mint, its Speed will grow more easily, but its Sp. Def will grow more slowly.',
    category: 'vitamin',
    effects: {
      changeNature: 'naive',
    },
  },
  {
    id: 'naughty-mint',
    name: 'Naughty Mint',
    description:
      'When a Pokémon smells this mint, its Attack will grow more easily, but its Sp. Def will grow more slowly.',
    category: 'vitamin',
    effects: {
      changeNature: 'naughty',
    },
  },
  {
    id: 'quiet-mint',
    name: 'Quiet Mint',
    description:
      'When a Pokémon smells this mint, its Sp. Atk will grow more easily, but its Speed will grow more slowly.',
    category: 'vitamin',
    effects: {
      changeNature: 'quiet',
    },
  },
  {
    id: 'rash-mint',
    name: 'Rash Mint',
    description:
      'When a Pokémon smells this mint, its Sp. Atk will grow more easily, but its Sp. Def will grow more slowly.',
    category: 'vitamin',
    effects: {
      changeNature: 'rash',
    },
  },
  {
    id: 'relaxed-mint',
    name: 'Relaxed Mint',
    description:
      'When a Pokémon smells this mint, its Defense will grow more easily, but its Speed will grow more slowly.',
    category: 'vitamin',
    effects: {
      changeNature: 'relaxed',
    },
  },
  {
    id: 'sassy-mint',
    name: 'Sassy Mint',
    description:
      'When a Pokémon smells this mint, its Sp. Def will grow more easily, but its Speed will grow more slowly.',
    category: 'vitamin',
    effects: {
      changeNature: 'sassy',
    },
  },
  {
    id: 'serious-mint',
    name: 'Serious Mint',
    description: 'When a Pokémon smells this mint, its stats will grow at an equal rate.',
    category: 'vitamin',
    effects: {
      changeNature: 'serious',
    },
  },
  {
    id: 'timid-mint',
    name: 'Timid Mint',
    description:
      'When a Pokémon smells this mint, its Speed will grow more easily, but its Attack will grow more slowly.',
    category: 'vitamin',
    effects: {
      changeNature: 'timid',
    },
  },
  // Bottle Caps
  {
    id: 'bottle-cap',
    name: 'Bottle Cap',
    description:
      "A beautiful bottle cap that gives off a silver glimmer. It can be used to maximize one of a Pokémon's individual strengths.",
    category: 'vitamin',
    spriteId: 'bottle-cap',
    effects: {
      maximizeOneIv: true,
    },
  },
  {
    id: 'gold-bottle-cap',
    name: 'Gold Bottle Cap',
    description:
      "A beautiful bottle cap that gives off a golden glimmer. It can be used to maximize all of a Pokémon's individual strengths.",
    category: 'vitamin',
    spriteId: 'gold-bottle-cap',
    effects: {
      maximizeIv: true,
    },
  },
]
