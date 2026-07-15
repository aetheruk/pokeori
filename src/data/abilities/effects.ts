import type { AbilityConfig, AbilityEffect, AbilityEffectCondition } from './types'

const SOUND_MOVE_IDS = [
  'growl',
  'roar',
  'sing',
  'supersonic',
  'screech',
  'snore',
  'perish-song',
  'heal-bell',
  'uproar',
  'hyper-voice',
  'metal-sound',
  'grass-whistle',
  'howl',
  'bug-buzz',
  'chatter',
  'round',
  'echoed-voice',
  'relic-song',
  'snarl',
  'noble-roar',
  'disarming-voice',
  'parting-shot',
  'boomburst',
  'confide',
  'sparkling-aria',
  'clanging-scales',
  'clangorous-soulblaze',
  'clangorous-soul',
  'overdrive',
  'eerie-spell',
  'torch-song',
  'dragon-cheer',
  'alluring-voice',
  'psychic-noise',
]

const BULLETPROOF_MOVE_IDS = [
  'acid-spray',
  'aura-sphere',
  'beak-blast',
  'bullet-seed',
  'chloroblast',
  'egg-bomb',
  'electro-ball',
  'energy-ball',
  'focus-blast',
  'gyro-ball',
  'ice-ball',
  'magnet-bomb',
  'mist-ball',
  'misty-explosion',
  'mud-bomb',
  'pollen-puff',
  'population-bomb',
  'pyro-ball',
  'rock-wrecker',
  'searing-shot',
  'seed-bomb',
  'shadow-ball',
  'sludge-bomb',
  'syrup-bomb',
  'weather-ball',
  'zap-cannon',
]

const POWDER_MOVE_IDS = [
  'cotton-spore',
  'magic-powder',
  'poison-powder',
  'powder',
  'sleep-powder',
  'spore',
  'stun-spore',
]

const IRON_FIST_MOVE_IDS = [
  'bullet-punch',
  'comet-punch',
  'dizzy-punch',
  'drain-punch',
  'dynamic-punch',
  'fire-punch',
  'focus-punch',
  'ice-punch',
  'jet-punch',
  'mach-punch',
  'mega-punch',
  'power-up-punch',
  'shadow-punch',
  'thunder-punch',
]

const STRONG_JAW_MOVE_IDS = [
  'bite',
  'bug-bite',
  'crunch',
  'fire-fang',
  'fishious-rend',
  'hyper-fang',
  'ice-fang',
  'jaw-lock',
  'poison-fang',
  'psychic-fangs',
  'thunder-fang',
]

const SHARPNESS_MOVE_IDS = [
  'air-cutter',
  'air-slash',
  'aqua-cutter',
  'behemoth-blade',
  'bitter-blade',
  'ceaseless-edge',
  'cut',
  'fury-cutter',
  'kowtow-cleave',
  'leaf-blade',
  'night-slash',
  'psyblade',
  'razor-leaf',
  'razor-shell',
  'sacred-sword',
  'secret-sword',
  'slash',
  'solar-blade',
  'stone-axe',
  'x-scissor',
]

const MEGA_LAUNCHER_MOVE_IDS = [
  'aura-sphere',
  'dark-pulse',
  'dragon-pulse',
  'heal-pulse',
  'origin-pulse',
  'water-pulse',
]

const TOUGH_CLAWS_MOVE_IDS = [
  'aerial-ace',
  'aqua-jet',
  'aqua-tail',
  'bite',
  'body-slam',
  'bounce',
  'brave-bird',
  'brick-break',
  'bug-bite',
  'crunch',
  'cut',
  'double-edge',
  'dragon-claw',
  'drain-punch',
  'drill-peck',
  'fell-stinger',
  'fire-fang',
  'fire-punch',
  'first-impression',
  'flame-wheel',
  'fly',
  'fury-cutter',
  'headbutt',
  'ice-fang',
  'ice-punch',
  'iron-head',
  'iron-tail',
  'knock-off',
  'leaf-blade',
  'leech-life',
  'low-kick',
  'lunge',
  'mach-punch',
  'mega-punch',
  'metal-claw',
  'night-slash',
  'play-rough',
  'poison-jab',
  'pounce',
  'power-up-punch',
  'quick-attack',
  'razor-shell',
  'rock-smash',
  'sacred-sword',
  'shadow-claw',
  'shadow-sneak',
  'slash',
  'smart-strike',
  'steel-wing',
  'sucker-punch',
  'thief',
  'thunder-fang',
  'thunder-punch',
  'u-turn',
  'waterfall',
  'wing-attack',
  'x-scissor',
  'zen-headbutt',
]

const PRIORITY_MOVE_IDS = [
  'accelerock',
  'aqua-jet',
  'bullet-punch',
  'extreme-speed',
  'fake-out',
  'feint',
  'first-impression',
  'ice-shard',
  'jet-punch',
  'mach-punch',
  'quick-attack',
  'shadow-sneak',
  'sucker-punch',
  'upper-hand',
  'vacuum-wave',
  'water-shuriken',
]

const EXPLOSION_MOVE_IDS = [
  'explosion',
  'mind-blown',
  'misty-explosion',
  'self-destruct',
]

const FLYING_PRIORITY_MOVE_IDS = [
  'acrobatics',
  'aerial-ace',
  'aeroblast',
  'air-cutter',
  'air-slash',
  'beak-blast',
  'bleakwind-storm',
  'bounce',
  'brave-bird',
  'chatter',
  'defog',
  'dragon-ascent',
  'drill-peck',
  'dual-wingbeat',
  'fly',
  'gust',
  'hurricane',
  'oblivion-wing',
  'peck',
  'pluck',
  'roost',
  'sky-attack',
  'tailwind',
  'wing-attack',
]

export const ABILITY_EXTRA_EFFECTS_BY_ID: Record<string, readonly AbilityEffect[]> = {

  // Explicit non-damage mechanics that should not receive generic battle fallbacks.
  aftermath: [
    {
      type: 'battle-on-damaged-ko-damage',
      target: 'attacker',
      damage: { type: 'attacker-max-hp-fraction', fraction: 4 },
      contactOnly: true,
    },
  ],
  armor_tail: [{ type: 'battle-move-block', moveIds: PRIORITY_MOVE_IDS }],
  anticipation: [{ type: 'battle-entry-danger-scout' }],
  analytic: [
    {
      type: 'battle-no-single-battle-effect',
      reason:
        'Analytic boosts power only when the holder moves after the target; turn-order interaction is not represented in this single-battle layer.',
    },
  ],
  battery: [
    {
      type: 'battle-no-single-battle-effect',
      reason:
        'Boosts an active ally special attack; this engine currently has one active Pokemon per side.',
    },
  ],
  contrary: [
    {
      type: 'battle-no-single-battle-effect',
      reason: 'Stat inversion on boosts is not modeled in this single-active battle loop.',
    },
  ],
  ball_fetch: [
    {
      type: 'battle-no-single-battle-effect',
      reason:
        'Retrieves consumed Poké Balls and has no direct combat damage or status effect in this engine.',
    },
  ],
  bulletproof: [{ type: 'battle-move-block', moveIds: BULLETPROOF_MOVE_IDS }],
  bad_dreams: [
    {
      type: 'battle-status-turn-damage',
      statuses: ['sleep'],
      damagePercent: 12.5,
    },
  ],
  cheek_pouch: [{ type: 'battle-berry-consume-heal', healPercent: 33 }],
  corrosion: [
    {
      type: 'battle-no-single-battle-effect',
      reason:
        'Allows poisons that bypass normal immunity checks at application time; no direct single-turn damage/stat mod effect.',
    },
    {
      type: 'battle-status-application-bypass',
      statuses: ['poison', 'bad-poison'],
    },
  ],
  commander: [
    {
      type: 'battle-no-single-battle-effect',
      reason:
        'Requires an active Dondozo ally command slot; this engine currently has one active Pokemon per side.',
    },
  ],
  compound_eyes: [{ type: 'battle-move-accuracy-multiplier', multiplier: 1.3 }],
  color_change: [{ type: 'battle-on-damaged-type-change' }],
  curious_medicine: [
    {
      type: 'battle-no-single-battle-effect',
      reason:
        'Cures team stat drops on switch-in in ally-based battles; not modeled for this single-battle engine.',
    },
  ],
  cud_chew: [
    {
      type: 'battle-no-single-battle-effect',
      reason:
        'Consumes and stores the next berry for the next move; this recovery interaction is not modeled in battle.',
    },
  ],
  costar: [
    {
      type: 'battle-no-single-battle-effect',
      reason:
        'Copies an active ally stat stage set on entry; this engine currently has one active Pokemon per side.',
    },
  ],
  cursed_body: [
    {
      type: 'battle-on-damaged-stance-disable',
      chance: 30,
      turns: 2,
    },
  ],
  cute_charm: [
    {
      type: 'battle-on-damaged-secondary-status',
      target: 'attacker',
      statusId: 'infatuation',
      name: 'Infatuation',
      effects: [{ type: 'infatuation', chance: 50 }],
      chance: 30,
      requiresOppositeGender: true,
    },
  ],
  dazzling: [{ type: 'battle-move-block', moveIds: PRIORITY_MOVE_IDS }],
  damp: [{ type: 'battle-move-block', moveIds: EXPLOSION_MOVE_IDS, scope: 'field' }],
  dancer: [
    {
      type: 'battle-no-single-battle-effect',
      reason:
        'Copies dance moves after an ally acts; this depends on multi-Pokémon ally interaction not modeled in single-battle combat.',
    },
  ],
  air_lock: [
    {
      type: 'battle-no-single-battle-effect',
      reason:
        'Suppresses weather effects in battle, but this single-active engine does not model full weather suppression.',
    },
  ],
  delta_stream: [{ type: 'battle-weather-set', weather: 'strong-winds', primal: true }],
  cloud_nine: [
    {
      type: 'battle-no-single-battle-effect',
      reason:
        'Suppresses weather effects in battle, but this single-active engine does not model full weather suppression.',
    },
  ],
  desolate_land: [
    {
      type: 'battle-weather-set',
      weather: 'extremely-harsh-sunlight',
      primal: true,
    },
  ],
  drizzle: [{ type: 'battle-weather-set', weather: 'rain' }],
  drought: [{ type: 'battle-weather-set', weather: 'harsh-sunlight' }],
  early_bird: [{ type: 'battle-status-counter-step', status: 'sleep', step: 2 }],
  electric_surge: [{ type: 'battle-terrain-set', terrain: 'electric' }],
  forecast: [{ type: 'battle-weather-type-change' }],
  forewarn: [{ type: 'battle-entry-move-scout' }],
  infiltrator: [
    {
      type: 'battle-no-single-battle-effect',
      reason:
        'Bypasses certain defensive screens only, but screen effect modeling is not present in this combat model.',
    },
  ],
  illuminate: [
    {
      type: 'battle-no-single-battle-effect',
      reason:
        'In battle this ability has no reliable single-turn combat effect in this engine; its listed purpose is encounter-rate support.',
    },
  ],
  intimidate: [
    { type: 'battle-entry-opponent-stat-stage-drop', statBoosts: { attack: -1 } },
  ],
  friend_guard: [
    {
      type: 'battle-no-single-battle-effect',
      reason:
        'Reduces damage to active allies; this engine currently has one active Pokemon per side.',
    },
  ],
  frisk: [{ type: 'battle-entry-held-item-scout' }],
  good_as_gold: [{ type: 'battle-status-move-immunity' }],
  gluttony: [{ type: 'battle-berry-trigger-threshold', thresholdPercent: 50 }],
  grassy_surge: [{ type: 'battle-terrain-set', terrain: 'grassy' }],
  hadron_engine: [
    { type: 'battle-terrain-set', terrain: 'electric' },
    {
      type: 'battle-stat-multiplier',
      stat: 'specialAttack',
      multiplier: 1.33,
    },
  ],
  harvest: [
    {
      type: 'battle-consumed-berry-restore',
      chance: 50,
      weatherChance: 100,
      weather: ['harsh-sunlight', 'extremely-harsh-sunlight'],
    },
  ],
  hunger_switch: [
    {
      type: 'battle-no-single-battle-effect',
      reason:
        'Morpeko form flips each turn; this engine does not track combat form-swapping state beyond basic stat/movement flow.',
    },
  ],
  hospitality: [
    {
      type: 'battle-no-single-battle-effect',
      reason:
        'Heals an active ally on entry; this engine currently has one active Pokemon per side.',
    },
  ],
  imposter: [{ type: 'battle-entry-transform' }],
  innards_out: [
    {
      type: 'battle-on-damaged-ko-damage',
      target: 'attacker',
      damage: { type: 'damage-taken' },
    },
  ],
  illusion: [{ type: 'battle-illusion-mask' }],
  iron_fist: [
    {
      type: 'battle-damage-multiplier',
      target: 'attacker',
      moveIds: IRON_FIST_MOVE_IDS,
      multiplier: 1.2,
    },
  ],
  klutz: [{ type: 'battle-held-item-effect-suppression' }],
  long_reach: [{ type: 'battle-contact-effect-immunity' }],
  lingering_aroma: [
    {
      type: 'battle-on-damaged-ability-change',
      mode: 'replace-attacker',
      abilityId: 'lingering_aroma',
      chance: 100,
    },
  ],
  libero: [{ type: 'battle-before-attack-type-change', oncePerSwitch: true }],
  mega_launcher: [
    {
      type: 'battle-damage-multiplier',
      target: 'attacker',
      moveIds: MEGA_LAUNCHER_MOVE_IDS,
      multiplier: 1.5,
    },
  ],
  mega_sol: [
    {
      type: 'battle-no-single-battle-effect',
      reason: 'A cosmetic form-change ability, not represented as a direct single-battle combat modifier.',
    },
  ],
  magician: [{ type: 'battle-post-damage-held-item-steal' }],
  magic_bounce: [{ type: 'battle-status-move-reflect' }],
  mimicry: [{ type: 'battle-terrain-type-change' }],
  minds_eye: [
    {
      type: 'battle-no-single-battle-effect',
      reason:
        'Mind’s Eye includes evasion/accuracy interaction and Ghost hit compatibility; those mechanics are not represented in this single-battle model.',
    },
  ],
  mycelium_might: [
    {
      type: 'battle-no-single-battle-effect',
      reason:
        'Marks status moves as delayed; status-move ordering beyond standard priority contests is not modeled.',
    },
  ],
  minus: [
    {
      type: 'battle-no-single-battle-effect',
      reason:
        'Requires an active Plus or Minus ally; this engine currently has one active Pokemon per side.',
    },
  ],
  multitype: [
    { type: 'battle-held-item-type-change', item: 'plate', fallbackType: 'normal' },
  ],
  mummy: [
    {
      type: 'battle-on-damaged-ability-change',
      mode: 'replace-attacker',
      abilityId: 'mummy',
      chance: 100,
    },
  ],
  misty_surge: [{ type: 'battle-terrain-set', terrain: 'misty' }],
  mold_breaker: [{ type: 'battle-defender-ability-bypass' }],
  no_guard: [{ type: 'battle-move-accuracy-bypass' }],
  orichalcum_pulse: [
    { type: 'battle-weather-set', weather: 'harsh-sunlight' },
    {
      type: 'battle-stat-multiplier',
      stat: 'attack',
      multiplier: 1.33,
    },
    {
      type: 'battle-stat-multiplier',
      stat: 'attack',
      multiplier: 1.5,
      weather: ['harsh-sunlight', 'extremely-harsh-sunlight'],
    },
  ],
  overcoat: [
    { type: 'battle-move-block', moveIds: POWDER_MOVE_IDS },
    { type: 'battle-weather-damage-immunity' },
  ],
  parental_bond: [{ type: 'battle-extra-hit', damageMultiplier: 0.25 }],
  pressure: [{ type: 'battle-opposing-move-use-depletion', extraUses: 1 }],
  prankster: [{ type: 'battle-priority-move-contest', nonDamagingOnly: true }],
  protean: [{ type: 'battle-before-attack-type-change', oncePerSwitch: true }],
  power_spot: [
    {
      type: 'battle-no-single-battle-effect',
      reason:
        'Boosts active allies near the holder; this engine currently has one active Pokemon per side.',
    },
  ],
  power_of_alchemy: [{ type: 'battle-entry-fainted-ally-ability-copy' }],
  primordial_sea: [{ type: 'battle-weather-set', weather: 'heavy-rain', primal: true }],
  psychic_surge: [{ type: 'battle-terrain-set', terrain: 'psychic' }],
  perish_body: [
    {
      type: 'battle-on-damaged-secondary-status',
      target: 'both',
      statusId: 'perish-song',
      name: 'Perish Song',
      triggers: ['turn-end'],
      effects: [{ type: 'damage', percentMaxHp: 100 }],
      chance: 100,
      delayTurns: 2,
      turns: 1,
    },
  ],
  pickpocket: [{ type: 'battle-on-damaged-held-item-steal' }],
  punk_rock: [
    {
      type: 'battle-no-single-battle-effect',
      reason:
        'Alters sound interactions and damage scaling; sound moves are not modeled with separate handling in this engine.',
    },
  ],
  plus: [
    {
      type: 'battle-no-single-battle-effect',
      reason:
        'Requires an active Plus or Minus ally; this engine currently has one active Pokemon per side.',
    },
  ],
  poison_heal: [
    {
      type: 'battle-status-turn-heal',
      statuses: ['poison', 'bad-poison'],
      healPercent: 12.5,
    },
  ],
  poison_touch: [
    {
      type: 'battle-post-damage-status',
      target: 'defender',
      statuses: ['poison'],
      chance: 30,
    },
  ],
  poison_puppeteer: [
    {
      type: 'battle-no-single-battle-effect',
      reason:
        'Requires confusion to coexist with poison after the holder poisons a target; the current engine models confusion as a main status rather than a volatile secondary status.',
    },
  ],
  queenly_majesty: [{ type: 'battle-move-block', moveIds: PRIORITY_MOVE_IDS }],
  propeller_tail: [
    {
      type: 'battle-no-single-battle-effect',
      reason:
        'Ignores moves and abilities that draw in moves, which is not represented in this single-battle framework.',
    },
  ],
  screen_cleaner: [
    {
      type: 'battle-no-single-battle-effect',
      reason:
        'Nullifies field side-board effects, but this engine does not model those barriers and reflections in combat.',
    },
  ],
  scrappy: [
    {
      type: 'battle-no-single-battle-effect',
      reason:
        'Enables Normal/Fighting to hit Ghost targets; no attacker-side type-immunity override primitive exists yet in this battle loop.',
    },
  ],
  spicy_spray: [
    {
      type: 'battle-no-single-battle-effect',
      reason:
        'Ability is a legacy placeholder with no reliable battle-layer behavior represented in this engine.',
    },
  ],
  stakeout: [
    {
      type: 'battle-no-single-battle-effect',
      reason:
        'Requires entry-turn context for opposing switch-ins, which is not tracked as a combat-state scalar here.',
    },
  ],
  stalwart: [
    {
      type: 'battle-no-single-battle-effect',
      reason:
        'Blocks move-draw-in interactions, requiring redirection mechanics not modeled in this single battle engine.',
    },
  ],
  supersweet_syrup: [
    {
      type: 'battle-no-single-battle-effect',
      reason:
        'Applies a one-time opposing evasiveness drop on entry and does not map cleanly to current battle-effect primitives.',
    },
  ],
  quick_draw: [{ type: 'battle-priority-move-contest', chance: 30 }],
  receiver: [{ type: 'battle-entry-fainted-ally-ability-copy' }],
  ripen: [{ type: 'battle-berry-effect-multiplier', multiplier: 2 }],
  run_away: [
    { type: 'battle-switch-prevention-immunity' },
    { type: 'active-escape', chance: 70 },
  ],
  shed_skin: [
    {
      type: 'battle-turn-end-status-cure',
      chance: 0.3,
      statuses: ['burn', 'frostbite', 'poison', 'bad-poison', 'paralysis', 'sleep', 'freeze'],
    },
  ],
  simple: [
    {
      type: 'battle-no-single-battle-effect',
      reason:
        'Doubles status modifiers; stat-stage scaling is not represented as a first-class combat modifier here.',
    },
  ],
  sand_veil: [
    {
      type: 'battle-move-accuracy-stage',
      stat: 'evasion',
      stages: 1,
      target: 'defender',
      weather: ['sandstorm'],
    },
    { type: 'battle-weather-damage-immunity', weather: ['sandstorm'] },
  ],
  sand_spit: [{ type: 'battle-weather-set', weather: 'sandstorm' }],
  sand_stream: [{ type: 'battle-weather-set', weather: 'sandstorm' }],
  seed_sower: [{ type: 'battle-on-damaged-terrain-set', terrain: 'grassy' }],
  rks_system: [
    { type: 'battle-held-item-type-change', item: 'memory', fallbackType: 'normal' },
  ],
  sharpness: [
    {
      type: 'battle-damage-multiplier',
      target: 'attacker',
      moveIds: SHARPNESS_MOVE_IDS,
      multiplier: 1.5,
    },
  ],
  serene_grace: [{ type: 'battle-secondary-effect-chance-multiplier', multiplier: 2 }],
  shield_dust: [{ type: 'battle-secondary-effect-immunity' }],
  shields_down: [
    {
      type: 'battle-no-single-battle-effect',
      reason:
        'Transform and status-immune form behavior for Minior is not modeled in this combat state.',
    },
  ],
  sheer_force: [{ type: 'battle-added-effect-damage-boost', multiplier: 1.3 }],
  skill_link: [{ type: 'battle-multi-hit-max' }],
  snow_warning: [{ type: 'battle-weather-set', weather: 'snow' }],
  snow_cloak: [
    {
      type: 'battle-move-accuracy-stage',
      stat: 'evasion',
      stages: 1,
      target: 'defender',
      weather: ['hail', 'snow', 'snowstorm'],
    },
    { type: 'battle-weather-damage-immunity', weather: ['hail', 'snow', 'snowstorm'] },
  ],
  sticky_hold: [{ type: 'battle-held-item-protection' }],
  stall: [{ type: 'battle-move-last' }],
  stench: [{ type: 'battle-damaging-move-interrupt-chance', chance: 10 }],
  sturdy: [{ type: 'battle-full-hp-survive' }],
  synchronize: [
    {
      type: 'battle-status-reflection',
      statuses: ['burn', 'paralysis', 'poison', 'bad-poison'],
    },
  ],
  symbiosis: [
    {
      type: 'battle-no-single-battle-effect',
      reason: 'Requires an active ally item-transfer slot; this engine currently has one active Pokemon per side.',
    },
  ],
  telepathy: [
    {
      type: 'battle-no-single-battle-effect',
      reason:
        'Avoids damage from ally attacks; this engine currently has one active Pokemon per side.',
    },
  ],
  teravolt: [{ type: 'battle-defender-ability-bypass' }],
  strong_jaw: [
    {
      type: 'battle-damage-multiplier',
      target: 'attacker',
      moveIds: STRONG_JAW_MOVE_IDS,
      multiplier: 1.5,
    },
  ],
  tough_claws: [
    {
      type: 'battle-damage-multiplier',
      target: 'attacker',
      moveIds: TOUGH_CLAWS_MOVE_IDS,
      multiplier: 1.33,
    },
  ],
  light_metal: [
    {
      type: 'battle-no-single-battle-effect',
      reason: 'Weight-based effects are not represented in this single-active combat model.',
    },
  ],
  heavy_metal: [
    {
      type: 'battle-no-single-battle-effect',
      reason: 'Weight-modifying abilities are not represented in combat math here.',
    },
  ],
  moody: [
    {
      type: 'battle-no-single-battle-effect',
      reason: 'Per-turn random stat cycling is not modeled in this single-active battle loop.',
    },
  ],
  triage: [{ type: 'battle-priority-move-contest', healingOnly: true }],
  trace: [
    { type: 'battle-entry-ability-copy' },
    {
      type: 'battle-no-single-battle-effect',
      reason:
        'In this model, Trace is represented as entry copy only; move-through-shield behavior is not modeled.',
    },
  ],
  unaware: [{ type: 'battle-opponent-stat-stage-bypass', stages: 'positive' }],
  steadfast: [
    {
      type: 'battle-no-single-battle-effect',
      reason: 'Requires flinch event tracking, which is not represented in this battle loop.',
    },
  ],
  truant: [
    {
      type: 'battle-before-move-skip',
      skipEveryActiveTurns: 2,
      firstSkipActiveTurn: 2,
    },
  ],
  turboblaze: [{ type: 'battle-defender-ability-bypass' }],
  toxic_debris: [
    {
      type: 'battle-on-damaged-side-secondary-status',
      targetSide: 'attacker',
      statusId: 'toxic-spikes',
      name: 'Toxic Spikes',
      effects: [{ type: 'apply-status', statusId: 'poison', chance: 100 }],
      chance: 100,
      turns: 5,
    },
  ],
  toxic_chain: [
    {
      type: 'battle-post-damage-status',
      target: 'defender',
      statuses: ['bad-poison'],
      chance: 30,
    },
  ],
  unburden: [
    {
      type: 'battle-stat-multiplier',
      stat: 'speed',
      multiplier: 2,
      heldItemLost: true,
    },
  ],
  unseen_fist: [
    {
      type: 'battle-no-single-battle-effect',
      reason:
        'Requires Protect/Detect-style move-breakthrough handling not modeled in this combat damage-resolution pipeline.',
    },
  ],
  unnerve: [
    {
      type: 'battle-no-single-battle-effect',
      reason:
        'Prevents opposing held-berry use, handled in encounter/reward logic rather than combat resolver.',
    },
  ],
  victory_star: [{ type: 'battle-move-accuracy-multiplier', multiplier: 1.1 }],
  gale_wings: [
    {
      type: 'battle-priority-move-contest',
      moveIds: FLYING_PRIORITY_MOVE_IDS,
      hpFull: true,
    },
  ],
  wandering_spirit: [
    {
      type: 'battle-on-damaged-ability-change',
      mode: 'swap',
      chance: 100,
    },
  ],
  tangled_feet: [
    {
      type: 'battle-move-accuracy-stage',
      stat: 'evasion',
      stages: 3,
      target: 'defender',
      statuses: ['confusion'],
    },
  ],
  wonder_skin: [
    {
      type: 'battle-move-accuracy-multiplier',
      target: 'defender',
      multiplier: 1,
      maxAccuracy: 50,
      nonDamagingOnly: true,
    },
  ],

  // Main-game battle abilities supported by this engine's single-battle model.
  water_absorb: [{ type: 'battle-type-absorb', attackTypes: ['water'], healPercent: 25 }],
  volt_absorb: [{ type: 'battle-type-absorb', attackTypes: ['electric'], healPercent: 25 }],
  earth_eater: [{ type: 'battle-type-absorb', attackTypes: ['ground'], healPercent: 25 }],
  dry_skin: [
    { type: 'battle-type-absorb', attackTypes: ['water'], healPercent: 25 },
    { type: 'battle-damage-multiplier', target: 'defender', attackTypes: ['fire'], multiplier: 1.25 },
    {
      type: 'battle-weather-turn-heal',
      weather: ['rain', 'heavy-rain', 'thunderstorm'],
      healPercent: 12.5,
    },
    {
      type: 'battle-weather-turn-damage',
      weather: ['harsh-sunlight', 'extremely-harsh-sunlight'],
      damagePercent: 12.5,
    },
  ],
  solar_power: [
    {
      type: 'battle-stat-multiplier',
      stat: 'specialAttack',
      multiplier: 1.5,
      weather: ['harsh-sunlight', 'extremely-harsh-sunlight'],
    },
    {
      type: 'battle-weather-turn-damage',
      weather: ['harsh-sunlight', 'extremely-harsh-sunlight'],
      damagePercent: 12.5,
    },
  ],
  flash_fire: [{ type: 'battle-type-immunity', attackTypes: ['fire'] }],
  lightning_rod: [
    {
      type: 'battle-type-absorb',
      attackTypes: ['electric'],
      statBoost: { specialAttack: 1 },
    },
  ],
  motor_drive: [
    { type: 'battle-type-absorb', attackTypes: ['electric'], statBoost: { speed: 1 } },
  ],
  sap_sipper: [
    { type: 'battle-type-absorb', attackTypes: ['grass'], statBoost: { attack: 1 } },
  ],
  storm_drain: [
    { type: 'battle-type-absorb', attackTypes: ['water'], statBoost: { specialAttack: 1 } },
  ],
  well_baked_body: [
    { type: 'battle-type-absorb', attackTypes: ['fire'], statBoost: { defense: 2 } },
  ],
  heatproof: [
    { type: 'battle-damage-multiplier', target: 'defender', attackTypes: ['fire'], multiplier: 0.5 },
  ],
  thick_fat: [
    { type: 'battle-damage-multiplier', target: 'defender', attackTypes: ['fire', 'ice'], multiplier: 0.5 },
  ],
  water_bubble: [
    { type: 'battle-status-immunity', statuses: ['burn'] },
    { type: 'battle-damage-multiplier', target: 'attacker', attackTypes: ['water'], multiplier: 2 },
    { type: 'battle-damage-multiplier', target: 'defender', attackTypes: ['fire'], multiplier: 0.5 },
  ],
  fluffy: [
    { type: 'battle-damage-multiplier', target: 'defender', attackTypes: ['fire'], multiplier: 2 },
  ],
  filter: [
    { type: 'battle-damage-multiplier', target: 'defender', multiplier: 0.75, typeEffectiveness: 'super-effective' },
  ],
  prism_armor: [
    { type: 'battle-damage-multiplier', target: 'defender', multiplier: 0.75, typeEffectiveness: 'super-effective' },
  ],
  solid_rock: [
    { type: 'battle-damage-multiplier', target: 'defender', multiplier: 0.75, typeEffectiveness: 'super-effective' },
  ],
  multiscale: [
    { type: 'battle-damage-multiplier', target: 'defender', multiplier: 0.5, hpFull: true },
  ],
  shadow_shield: [
    { type: 'battle-damage-multiplier', target: 'defender', multiplier: 0.5, hpFull: true },
  ],
  tinted_lens: [
    { type: 'battle-damage-multiplier', target: 'attacker', multiplier: 2, typeEffectiveness: 'not-very-effective' },
  ],
  neuroforce: [
    { type: 'battle-damage-multiplier', target: 'attacker', multiplier: 1.25, typeEffectiveness: 'super-effective' },
  ],
  technician: [
    { type: 'battle-damage-multiplier', target: 'attacker', multiplier: 1.5, movePowerAtOrBelow: 60 },
  ],
  overgrow: [
    { type: 'battle-damage-multiplier', target: 'attacker', attackTypes: ['grass'], multiplier: 1.5, hpAtOrBelowPercent: 33 },
  ],
  blaze: [
    { type: 'battle-damage-multiplier', target: 'attacker', attackTypes: ['fire'], multiplier: 1.5, hpAtOrBelowPercent: 33 },
  ],
  torrent: [
    { type: 'battle-damage-multiplier', target: 'attacker', attackTypes: ['water'], multiplier: 1.5, hpAtOrBelowPercent: 33 },
  ],
  swarm: [
    { type: 'battle-damage-multiplier', target: 'attacker', attackTypes: ['bug'], multiplier: 1.5, hpAtOrBelowPercent: 33 },
  ],
  steelworker: [
    { type: 'battle-damage-multiplier', target: 'attacker', attackTypes: ['steel'], multiplier: 1.5 },
  ],
  steely_spirit: [
    { type: 'battle-damage-multiplier', target: 'attacker', attackTypes: ['steel'], multiplier: 1.5 },
  ],
  transistor: [
    { type: 'battle-damage-multiplier', target: 'attacker', attackTypes: ['electric'], multiplier: 1.3 },
  ],
  dragons_maw: [
    { type: 'battle-damage-multiplier', target: 'attacker', attackTypes: ['dragon'], multiplier: 1.5 },
  ],
  huge_power: [{ type: 'battle-stat-multiplier', stat: 'attack', multiplier: 2 }],
  pure_power: [{ type: 'battle-stat-multiplier', stat: 'attack', multiplier: 2 }],
  fur_coat: [{ type: 'battle-stat-multiplier', stat: 'defense', multiplier: 2, stance: ['power'] }],
  ice_scales: [
    { type: 'battle-stat-multiplier', stat: 'specialDefense', multiplier: 2, stance: ['tech'] },
  ],
  marvel_scale: [
    { type: 'battle-stat-multiplier', stat: 'defense', multiplier: 1.5, statuses: ['any'] },
  ],
  guts: [
    { type: 'battle-stat-multiplier', stat: 'attack', multiplier: 1.5, statuses: ['any'] },
  ],
  quick_feet: [
    { type: 'battle-stat-multiplier', stat: 'speed', multiplier: 1.5, statuses: ['any'] },
  ],
  flare_boost: [
    { type: 'battle-stat-multiplier', stat: 'specialAttack', multiplier: 1.5, statuses: ['burn'] },
  ],
  toxic_boost: [
    { type: 'battle-stat-multiplier', stat: 'attack', multiplier: 1.5, statuses: ['poison', 'bad-poison'] },
  ],
  defeatist: [
    { type: 'battle-stat-multiplier', stat: 'attack', multiplier: 0.5, hpAtOrBelowPercent: 50 },
    { type: 'battle-stat-multiplier', stat: 'specialAttack', multiplier: 0.5, hpAtOrBelowPercent: 50 },
  ],
  gorilla_tactics: [
    { type: 'battle-stat-multiplier', stat: 'attack', multiplier: 1.5 },
    { type: 'battle-self-move-lock' },
  ],
  hustle: [
    { type: 'battle-stat-multiplier', stat: 'attack', multiplier: 1.5 },
    { type: 'battle-move-accuracy-multiplier', multiplier: 0.8 },
  ],
  swift_swim: [
    { type: 'battle-stat-multiplier', stat: 'speed', multiplier: 2, weather: ['rain', 'heavy-rain', 'thunderstorm'] },
  ],
  chlorophyll: [
    { type: 'battle-stat-multiplier', stat: 'speed', multiplier: 2, weather: ['harsh-sunlight', 'extremely-harsh-sunlight'] },
  ],
  sand_rush: [
    { type: 'battle-stat-multiplier', stat: 'speed', multiplier: 2, weather: ['sandstorm'] },
  ],
  slush_rush: [
    { type: 'battle-stat-multiplier', stat: 'speed', multiplier: 2, weather: ['hail', 'snow', 'snowstorm'] },
  ],
  sand_force: [
    { type: 'battle-damage-multiplier', target: 'attacker', attackTypes: ['rock', 'ground', 'steel'], multiplier: 1.3, weather: ['sandstorm'] },
  ],
  limber: [{ type: 'battle-status-immunity', statuses: ['paralysis'] }],
  immunity: [{ type: 'battle-status-immunity', statuses: ['poison', 'bad-poison'] }],
  insomnia: [{ type: 'battle-status-immunity', statuses: ['sleep'] }],
  vital_spirit: [{ type: 'battle-status-immunity', statuses: ['sleep'] }],
  magma_armor: [{ type: 'battle-status-immunity', statuses: ['freeze'] }],
  water_veil: [{ type: 'battle-status-immunity', statuses: ['burn'] }],
  own_tempo: [{ type: 'battle-status-immunity', statuses: ['confusion'] }],
  sweet_veil: [{ type: 'battle-status-immunity', statuses: ['sleep'] }],
  leaf_guard: [
    {
      type: 'battle-status-immunity',
      statuses: ['burn', 'frostbite', 'paralysis', 'poison', 'bad-poison', 'sleep', 'freeze'],
      weather: ['harsh-sunlight', 'extremely-harsh-sunlight'],
    },
  ],
  levitate: [{ type: 'battle-type-immunity', attackTypes: ['ground'] }],
  wonder_guard: [
    { type: 'battle-damage-gate', mode: 'super-effective-only' },
    { type: 'battle-max-hp', hp: 1 },
  ],
  disguise: [{ type: 'battle-one-hit-shield', shieldId: 'disguise' }],
  ice_face: [
    {
      type: 'battle-one-hit-shield',
      shieldId: 'ice_face',
      blockedStances: ['power', 'speed'],
      breakFormId: '10185',
    },
  ],
  stance_change: [
    {
      type: 'battle-form-change',
      trigger: 'before-attack',
      formId: '10026',
      sourceFormIds: ['681'],
    },
  ],
  schooling: [
    {
      type: 'battle-form-change',
      trigger: 'hp-threshold',
      formId: '10127',
      sourceFormIds: ['746'],
      minLevel: 20,
      hpAbovePercent: 25,
    },
    {
      type: 'battle-form-change',
      trigger: 'hp-threshold',
      formId: '746',
      sourceFormIds: ['10127'],
      hpAtOrBelowPercent: 25,
    },
  ],
  zero_to_hero: [
    {
      type: 'battle-form-change',
      trigger: 'switch-out',
      formId: '10256',
      sourceFormIds: ['964'],
    },
  ],
  battle_bond: [
    {
      type: 'battle-form-change',
      trigger: 'after-ko',
      formId: '10117',
      sourceFormIds: ['10116'],
    },
  ],
  zen_mode: [
    {
      type: 'battle-form-change',
      trigger: 'hp-threshold',
      formId: '10017',
      sourceFormIds: ['555'],
      hpAtOrBelowPercent: 50,
    },
    {
      type: 'battle-form-change',
      trigger: 'hp-threshold',
      formId: '555',
      sourceFormIds: ['10017'],
      hpAbovePercent: 50,
    },
    {
      type: 'battle-form-change',
      trigger: 'hp-threshold',
      formId: '10178',
      sourceFormIds: ['10177'],
      hpAtOrBelowPercent: 50,
    },
    {
      type: 'battle-form-change',
      trigger: 'hp-threshold',
      formId: '10177',
      sourceFormIds: ['10178'],
      hpAbovePercent: 50,
    },
  ],
  power_construct: [
    {
      type: 'battle-form-change',
      trigger: 'hp-threshold',
      formId: '10120',
      sourceFormIds: ['718', '10181'],
      hpAtOrBelowPercent: 50,
    },
  ],
  tera_shift: [
    {
      type: 'battle-form-change',
      trigger: 'entry',
      formId: '10276',
      sourceFormIds: ['1024'],
    },
  ],
  teraform_zero: [
    {
      type: 'battle-tera-activation',
      formId: '10277',
      sourceFormIds: ['10277'],
      clearWeather: true,
      clearTerrain: true,
    },
  ],
  tera_shell: [
    {
      type: 'battle-type-effectiveness-override',
      target: 'defender',
      typeEffectiveness: 0.5,
      hpFull: true,
      sourceFormIds: ['10276'],
    },
  ],
  aroma_veil: [
    {
      type: 'battle-mental-effect-immunity',
      effectIds: ['infatuation', 'attract', 'captivate', 'disable', 'encore', 'taunt', 'torment', 'heal-block', 'cursed-body'],
    },
  ],
  pickup: [
    {
      type: 'battle-win-rewards',
      holderNoHeldItem: true,
      rewards: [
        { type: 'item', targetId: 'poke-ball', quantity: 1, dropChance: 2.5 },
        { type: 'item', targetId: 'repel', quantity: 1, dropChance: 2.5 },
        { type: 'item', targetId: 'escape-rope', quantity: 1, dropChance: 2.5 },
        { type: 'item', targetId: 'stardust', quantity: 1, dropChance: 2.5 },
      ],
    },
  ],
  flower_veil: [
    {
      type: 'battle-status-immunity',
      statuses: ['burn', 'frostbite', 'paralysis', 'poison', 'bad-poison', 'sleep', 'freeze'],
      pokemonTypes: ['grass'],
    },
    {
      type: 'battle-stat-stage-immunity',
      source: 'opponent',
      pokemonTypes: ['grass'],
    },
  ],
  healer: [{ type: 'battle-turn-end-status-cure', chance: 0.3 }],
  neutralizing_gas: [{ type: 'battle-active-ability-suppression' }],
}

const FIELD_OBSERVATION_CONDITION: AbilityEffectCondition = {
  gameType: ['field-observation'],
}

const CAPTURE_SUCCESS_CONDITION: AbilityEffectCondition = {
  caught: true,
}

const friendlyCaptureEffects: readonly AbilityEffect[] = [
  { type: 'catch-rate-multiplier', multiplier: 1.08 },
  { type: 'field-observation-reward-protection', chance: 10, condition: FIELD_OBSERVATION_CONDITION },
]

const scoutingEffects: readonly AbilityEffect[] = [
  { type: 'timer-delta', seconds: 2 },
  { type: 'capture-research-xp', amount: 1, target: 'encounter-form', condition: CAPTURE_SUCCESS_CONDITION },
  {
    type: 'field-observation-duration-delta',
    answerSeconds: 1,
    condition: FIELD_OBSERVATION_CONDITION,
  },
  {
    type: 'field-observation-research-xp-multiplier',
    multiplier: 1.03,
    condition: FIELD_OBSERVATION_CONDITION,
  },
]

const visibilityEffects: readonly AbilityEffect[] = [
  { type: 'catch-rate-multiplier', multiplier: 1.05 },
  {
    type: 'field-observation-duration-delta',
    observationSeconds: 2,
    answerSeconds: 1,
    condition: FIELD_OBSERVATION_CONDITION,
  },
  {
    type: 'field-observation-spawn-modifier',
    hiddenChanceMultiplier: 0.9,
    eventChanceMultiplier: 1.05,
    condition: FIELD_OBSERVATION_CONDITION,
  },
]

const speedTimingEffects: readonly AbilityEffect[] = [
  { type: 'timer-delta', seconds: 2 },
  {
    type: 'field-observation-duration-delta',
    answerSeconds: 1,
    condition: FIELD_OBSERVATION_CONDITION,
  },
]

const rewardProtectionEffects: readonly AbilityEffect[] = [
  { type: 'field-observation-reward-protection', chance: 15, condition: FIELD_OBSERVATION_CONDITION },
]

function typeLureEffects(type: string): readonly AbilityEffect[] {
  return [
    {
      type: 'catch-rate-multiplier',
      multiplier: 1.05,
      condition: { type: [type] },
    },
    {
      type: 'field-observation-pool-weight-multiplier',
      multiplier: 1.12,
      condition: { ...FIELD_OBSERVATION_CONDITION, type: [type] },
    },
  ]
}

function weatherTypeLureEffects(type: string, weather: readonly string[]): readonly AbilityEffect[] {
  return [
    ...typeLureEffects(type),
    {
      type: 'field-observation-pool-weight-multiplier',
      multiplier: 1.08,
      condition: { ...FIELD_OBSERVATION_CONDITION, type: [type], weather: [...weather] },
    },
  ]
}

function captureItemEffects(itemIds: string[], chance = 8): readonly AbilityEffect[] {
  return [
    {
      type: 'capture-random-item',
      itemIds,
      chance,
      condition: CAPTURE_SUCCESS_CONDITION,
    },
  ]
}

function fieldExtraItemEffect(
  itemId: string,
  chance: number,
  kind: Extract<AbilityEffect, { type: 'field-observation-extra-collectible' }>['kind'] = 'item',
): AbilityEffect {
  return {
    type: 'field-observation-extra-collectible',
    reward: { type: 'item', targetId: itemId, quantity: 1 },
    kind,
    condition: { ...FIELD_OBSERVATION_CONDITION, chance },
  }
}

const gathererEffects: readonly AbilityEffect[] = [
  ...captureItemEffects(['poke-ball', 'repel', 'escape-rope', 'stardust'], 8),
  fieldExtraItemEffect('researchers-journal-page', 8),
  {
    type: 'field-observation-global-event-odds-multiplier',
    itemEventMultiplier: 1.08,
    condition: FIELD_OBSERVATION_CONDITION,
  },
]

const berryGathererEffects: readonly AbilityEffect[] = [
  ...captureItemEffects(['oran-berry', 'sitrus-berry', 'razz-berry'], 10),
  fieldExtraItemEffect('oran-berry', 8, 'berry'),
  {
    type: 'field-observation-collectible-modifier',
    quantityBonus: 1,
    durationMultiplier: 1.05,
    condition: { ...FIELD_OBSERVATION_CONDITION, surveyFocus: ['berry-survey'] },
  },
]

const luckyEffects: readonly AbilityEffect[] = [
  ...captureItemEffects(['stardust', 'pearl', 'tiny-mushroom'], 8),
  {
    type: 'field-observation-global-event-odds-multiplier',
    pokemonEventMultiplier: 1.05,
    itemEventMultiplier: 1.1,
    condition: FIELD_OBSERVATION_CONDITION,
  },
]

export const ABILITY_SECONDARY_EFFECTS_BY_ID: Record<string, readonly AbilityEffect[]> = {
  // Friendly and calming abilities make wild capture a little easier without changing spawns.
  cute_charm: friendlyCaptureEffects,
  friend_guard: friendlyCaptureEffects,
  aroma_veil: friendlyCaptureEffects,
  sweet_veil: friendlyCaptureEffects,
  hospitality: friendlyCaptureEffects,

  // Accuracy and visibility abilities make Field Observation targets easier to read.
  compound_eyes: visibilityEffects,
  keen_eye: visibilityEffects,
  illuminate: [
    ...visibilityEffects,
    {
      type: 'field-observation-spawn-modifier',
      eventChanceMultiplier: 1.08,
      condition: FIELD_OBSERVATION_CONDITION,
    },
  ],
  no_guard: visibilityEffects,
  victory_star: [
    { type: 'catch-rate-multiplier', multiplier: 1.05 },
    {
      type: 'field-observation-research-xp-multiplier',
      multiplier: 1.05,
      condition: FIELD_OBSERVATION_CONDITION,
    },
  ],
  minds_eye: visibilityEffects,

  // Scouting abilities provide small timing and research benefits.
  forewarn: scoutingEffects,
  anticipation: scoutingEffects,
  frisk: [
    ...scoutingEffects,
    {
      type: 'field-observation-global-event-odds-multiplier',
      itemEventMultiplier: 1.08,
      condition: FIELD_OBSERVATION_CONDITION,
    },
  ],
  trace: scoutingEffects,
  download: scoutingEffects,
  analytic: [
    ...scoutingEffects,
    {
      type: 'field-observation-research-xp-multiplier',
      multiplier: 1.05,
      condition: FIELD_OBSERVATION_CONDITION,
    },
  ],

  // Gatherer and luck abilities add low-chance side rewards.
  pickup: gathererEffects,
  honey_gather: [
    ...captureItemEffects(['razz-berry', 'oran-berry', 'tiny-mushroom'], 10),
    fieldExtraItemEffect('razz-berry', 8, 'berry'),
    {
      type: 'battle-no-single-battle-effect',
      reason: 'Collects honey/berries after battle; this side effect is outside combat damage calculations.',
    },
  ],
  cheek_pouch: berryGathererEffects,
  harvest: berryGathererEffects,
  gluttony: berryGathererEffects,
  ripen: berryGathererEffects,
  super_luck: luckyEffects,
  magician: gathererEffects,
  pickpocket: gathererEffects,

  // Defensive utility abilities protect gathered Field Observation items.
  sticky_hold: rewardProtectionEffects,
  suction_cups: rewardProtectionEffects,
  shield_dust: rewardProtectionEffects,
  battle_armor: rewardProtectionEffects,
  shell_armor: rewardProtectionEffects,
  sturdy: rewardProtectionEffects,
  damp: rewardProtectionEffects,
  overcoat: rewardProtectionEffects,

  // Movement and timing abilities help with encounter pace.
  quick_feet: speedTimingEffects,
  early_bird: speedTimingEffects,
  quick_draw: speedTimingEffects,
  speed_boost: speedTimingEffects,
  unburden: speedTimingEffects,

  // Type and weather abilities slightly bias matching targets.
  magnet_pull: [...typeLureEffects('steel'), ...typeLureEffects('electric')],
  lightning_rod: typeLureEffects('electric'),
  motor_drive: typeLureEffects('electric'),
  volt_absorb: typeLureEffects('electric'),
  water_absorb: typeLureEffects('water'),
  storm_drain: typeLureEffects('water'),
  dry_skin: typeLureEffects('water'),
  flash_fire: typeLureEffects('fire'),
  flame_body: typeLureEffects('fire'),
  sap_sipper: typeLureEffects('grass'),
  swarm: [
    {
      type: 'catch-rate-multiplier',
      multiplier: 1.05,
      condition: { type: ['bug'] },
    },
    {
      type: 'field-observation-pool-weight-multiplier',
      multiplier: 1.12,
      condition: { ...FIELD_OBSERVATION_CONDITION, type: ['bug'] },
    },
    {
      type: 'field-observation-spawn-modifier',
      spawnCountMultiplier: 1.08,
      condition: { ...FIELD_OBSERVATION_CONDITION, surveyFocus: ['swarm-survey'] },
    },
  ],
  sand_stream: weatherTypeLureEffects('rock', ['sandstorm']),
  sand_spit: weatherTypeLureEffects('ground', ['sandstorm']),
  snow_warning: weatherTypeLureEffects('ice', ['hail', 'snow', 'snowstorm']),
  drizzle: weatherTypeLureEffects('water', ['rain', 'heavy-rain', 'thunderstorm']),
  drought: weatherTypeLureEffects('fire', ['harsh-sunlight', 'extremely-harsh-sunlight']),
  electric_surge: typeLureEffects('electric'),
  grassy_surge: typeLureEffects('grass'),
  psychic_surge: typeLureEffects('psychic'),
  misty_surge: typeLureEffects('fairy'),
}

function hasExplicitEffect(effects: readonly AbilityEffect[], type: AbilityEffect['type']): boolean {
  return effects.some((effect) => effect.type === type)
}

const POKEMON_TYPES = [
  'normal',
  'fire',
  'water',
  'electric',
  'grass',
  'ice',
  'fighting',
  'poison',
  'ground',
  'flying',
  'psychic',
  'bug',
  'rock',
  'ghost',
  'dragon',
  'dark',
  'steel',
  'fairy',
] as const

const ABILITY_TYPE_DAMAGE_BOOSTS: Record<string, readonly string[]> = {
  aerilate: ['flying'],
  aura_break: ['dragon'],
  dark_aura: ['dark'],
  dragonize: ['dragon'],
  fairy_aura: ['fairy'],
  galvanize: ['electric'],
  liquid_voice: ['water'],
  normalize: ['normal'],
  pixilate: ['fairy'],
  refrigerate: ['ice'],
  rocky_payload: ['rock'],
  steelworker: ['steel'],
  steely_spirit: ['steel'],
}

const ABILITY_STAT_MULTIPLIERS: Record<
  string,
  readonly Extract<AbilityEffect, { type: 'battle-stat-multiplier' }>[]
> = {
  beads_of_ruin: [{ type: 'battle-stat-multiplier', stat: 'specialAttack', multiplier: 1.25 }],
  chlorophyll: [{ type: 'battle-stat-multiplier', stat: 'speed', multiplier: 2, weather: ['harsh-sunlight', 'extremely-harsh-sunlight'] }],
  dauntless_shield: [{ type: 'battle-stat-multiplier', stat: 'defense', multiplier: 1.25 }],
  download: [{ type: 'battle-stat-multiplier', stat: 'attack', multiplier: 1.15 }],
  flower_gift: [
    { type: 'battle-stat-multiplier', stat: 'attack', multiplier: 1.5, weather: ['harsh-sunlight', 'extremely-harsh-sunlight'] },
    { type: 'battle-stat-multiplier', stat: 'specialDefense', multiplier: 1.5, weather: ['harsh-sunlight', 'extremely-harsh-sunlight'] },
  ],
  grass_pelt: [{ type: 'battle-stat-multiplier', stat: 'defense', multiplier: 1.5 }],
  hadron_engine: [{ type: 'battle-stat-multiplier', stat: 'specialAttack', multiplier: 1.25 }],
  intrepid_sword: [{ type: 'battle-stat-multiplier', stat: 'attack', multiplier: 1.25 }],
  justified: [{ type: 'battle-stat-multiplier', stat: 'attack', multiplier: 1.15 }],
  orichalcum_pulse: [
    { type: 'battle-stat-multiplier', stat: 'attack', multiplier: 1.33 },
    { type: 'battle-stat-multiplier', stat: 'attack', multiplier: 1.5, weather: ['harsh-sunlight', 'extremely-harsh-sunlight'] },
  ],
  protosynthesis: [{ type: 'battle-stat-multiplier', stat: 'attack', multiplier: 1.3, weather: ['harsh-sunlight', 'extremely-harsh-sunlight'] }],
  quark_drive: [{ type: 'battle-stat-multiplier', stat: 'speed', multiplier: 1.3 }],
  slow_start: [
    { type: 'battle-stat-multiplier', stat: 'attack', multiplier: 0.5, activeTurnsAtOrBelow: 5 },
    { type: 'battle-stat-multiplier', stat: 'speed', multiplier: 0.5, activeTurnsAtOrBelow: 5 },
  ],
  speed_boost: [{ type: 'battle-stat-multiplier', stat: 'speed', multiplier: 1.25 }],
  sword_of_ruin: [{ type: 'battle-stat-multiplier', stat: 'attack', multiplier: 1.25 }],
  tablets_of_ruin: [{ type: 'battle-stat-multiplier', stat: 'defense', multiplier: 1.25 }],
  vessel_of_ruin: [{ type: 'battle-stat-multiplier', stat: 'specialDefense', multiplier: 1.25 }],
  wind_rider: [{ type: 'battle-stat-multiplier', stat: 'attack', multiplier: 1.15 }],
}

const ABILITY_DAMAGE_MULTIPLIERS: Record<
  string,
  readonly Extract<AbilityEffect, { type: 'battle-damage-multiplier' }>[]
> = {
  adaptability: [{ type: 'battle-damage-multiplier', target: 'attacker', multiplier: 1.15 }],
  comatose: [{ type: 'battle-damage-multiplier', target: 'defender', multiplier: 0.9, statuses: ['sleep'] }],
  liquid_ooze: [{ type: 'battle-damage-multiplier', target: 'defender', attackTypes: ['poison'], multiplier: 0.85 }],
  piercing_drill: [{ type: 'battle-damage-multiplier', target: 'attacker', attackTypes: ['steel'], multiplier: 1.1 }],
  purifying_salt: [{ type: 'battle-damage-multiplier', target: 'defender', attackTypes: ['ghost'], multiplier: 0.5 }],
  rivalry: [{ type: 'battle-damage-multiplier', target: 'attacker', multiplier: 1.05 }],
  supreme_overlord: [{ type: 'battle-damage-multiplier', target: 'attacker', multiplier: 1.2 }],
  surge_surfer: [{ type: 'battle-damage-multiplier', target: 'attacker', attackTypes: ['electric'], multiplier: 1.2 }],
}

const ABILITY_STATUS_IMMUNITIES: Record<string, readonly string[]> = {
  hydration: ['burn', 'frostbite', 'paralysis', 'poison', 'bad-poison', 'sleep', 'freeze'],
  oblivious: ['infatuation'],
  overcoat: ['powder'],
  pastel_veil: ['poison', 'bad-poison'],
  purifying_salt: ['burn', 'frostbite', 'paralysis', 'poison', 'bad-poison', 'sleep', 'freeze'],
  soundproof: ['confusion'],
  thermal_exchange: ['burn'],
  water_bubble: ['burn'],
}

const ABILITY_STAT_STAGE_IMMUNITIES: Record<
  string,
  readonly Extract<AbilityEffect, { type: 'battle-stat-stage-immunity' }>[]
> = {
  keen_eye: [{ type: 'battle-stat-stage-immunity', stats: ['accuracy'] }],
  big_pecks: [{ type: 'battle-stat-stage-immunity', stats: ['defense'], source: 'opponent' }],
  clear_body: [{ type: 'battle-stat-stage-immunity', source: 'opponent' }],
  full_metal_body: [{ type: 'battle-stat-stage-immunity', source: 'opponent' }],
  hyper_cutter: [{ type: 'battle-stat-stage-immunity', stats: ['attack'], source: 'opponent' }],
  white_smoke: [{ type: 'battle-stat-stage-immunity', source: 'opponent' }],
}

const ABILITY_INTERRUPT_IMMUNITIES: Record<
  string,
  readonly Extract<AbilityEffect, { type: 'battle-interrupt-immunity' }>[]
> = {
  inner_focus: [{ type: 'battle-interrupt-immunity' }],
}

const ABILITY_CRIT_EFFECTS: Record<
  string,
  readonly Extract<AbilityEffect, { type: 'battle-crit-immunity' | 'battle-crit-modifier' | 'battle-guaranteed-crit' }>[]
> = {
  battle_armor: [{ type: 'battle-crit-immunity' }],
  merciless: [
    {
      type: 'battle-guaranteed-crit',
      targetStatuses: ['poison', 'bad-poison'],
    },
  ],
  shell_armor: [{ type: 'battle-crit-immunity' }],
  sniper: [{ type: 'battle-crit-modifier', damageMultiplier: 1.5 }],
  super_luck: [{ type: 'battle-crit-modifier', chanceDelta: 0.125 }],
}

const ABILITY_AFTER_KO_STAT_STAGES: Record<
  string,
  readonly Extract<AbilityEffect, { type: 'battle-after-ko-stat-stage' }>[]
> = {
  as_one_glastrier: [{ type: 'battle-after-ko-stat-stage', stat: 'attack', stages: 1 }],
  as_one_spectrier: [{ type: 'battle-after-ko-stat-stage', stat: 'specialAttack', stages: 1 }],
  beast_boost: [{ type: 'battle-after-ko-stat-stage', stat: 'attack', stages: 1 }],
  chilling_neigh: [{ type: 'battle-after-ko-stat-stage', stat: 'attack', stages: 1 }],
  grim_neigh: [{ type: 'battle-after-ko-stat-stage', stat: 'specialAttack', stages: 1 }],
  moxie: [{ type: 'battle-after-ko-stat-stage', stat: 'attack', stages: 1 }],
  soul_heart: [{ type: 'battle-after-ko-stat-stage', stat: 'specialAttack', stages: 1 }],
}

const ABILITY_STAT_STAGE_DROP_TRIGGERS: Record<
  string,
  readonly Extract<AbilityEffect, { type: 'battle-stat-stage-drop-trigger' }>[]
> = {
  competitive: [
    {
      type: 'battle-stat-stage-drop-trigger',
      statBoosts: { specialAttack: 2 },
      source: 'opponent',
    },
  ],
  defiant: [
    {
      type: 'battle-stat-stage-drop-trigger',
      statBoosts: { attack: 2 },
      source: 'opponent',
    },
  ],
  guard_dog: [
    {
      type: 'battle-stat-stage-drop-trigger',
      statBoosts: { attack: 1 },
      source: 'opponent',
    },
  ],
}

const ABILITY_STAT_STAGE_DROP_REFLECTIONS: Record<
  string,
  readonly Extract<AbilityEffect, { type: 'battle-stat-stage-drop-reflect' }>[]
> = {
  mirror_armor: [
    {
      type: 'battle-stat-stage-drop-reflect',
      source: 'opponent',
    },
  ],
}

const ABILITY_OPPONENT_STAT_STAGE_BOOST_COPIES: Record<
  string,
  readonly Extract<AbilityEffect, { type: 'battle-opponent-stat-stage-boost-copy' }>[]
> = {
  opportunist: [{ type: 'battle-opponent-stat-stage-boost-copy' }],
}

const ABILITY_SWITCH_PREVENTIONS: Record<
  string,
  readonly Extract<AbilityEffect, { type: 'battle-switch-prevention' }>[]
> = {
  arena_trap: [
    {
      type: 'battle-switch-prevention',
      excludedTypes: ['flying'],
      excludedAbilities: ['levitate'],
    },
  ],
  magnet_pull: [
    {
      type: 'battle-switch-prevention',
      affectedTypes: ['steel'],
    },
  ],
  shadow_tag: [{ type: 'battle-switch-prevention' }],
}

const ABILITY_FORCED_SWITCH_IMMUNITIES: Record<
  string,
  readonly Extract<AbilityEffect, { type: 'battle-forced-switch-immunity' }>[]
> = {
  suction_cups: [{ type: 'battle-forced-switch-immunity' }],
}

const ABILITY_SWITCH_OUT_EFFECTS: Record<
  string,
  readonly Extract<
    AbilityEffect,
    { type: 'battle-switch-out-heal' | 'battle-switch-out-status-cure' }
  >[]
> = {
  natural_cure: [{ type: 'battle-switch-out-status-cure' }],
  regenerator: [{ type: 'battle-switch-out-heal', healPercent: 33 }],
}

const ABILITY_LOW_HP_SELF_SWITCHES: Record<
  string,
  readonly Extract<AbilityEffect, { type: 'battle-low-hp-self-switch' }>[]
> = {
  emergency_exit: [
    {
      type: 'battle-low-hp-self-switch',
      hpCrossedAtOrBelowPercent: 50,
    },
  ],
  wimp_out: [
    {
      type: 'battle-low-hp-self-switch',
      hpCrossedAtOrBelowPercent: 50,
    },
  ],
}

const ABILITY_OUTGOING_DAMAGE_REDUCTION_IMMUNITIES: Record<
  string,
  readonly Extract<AbilityEffect, { type: 'battle-outgoing-damage-reduction-immunity' }>[]
> = {
  // Reserved for future abilities only.
}

const ABILITY_ON_DAMAGED_STAT_STAGES: Record<
  string,
  readonly Extract<AbilityEffect, { type: 'battle-on-damaged-stat-stage' }>[]
> = {
  anger_point: [
    {
      type: 'battle-on-damaged-stat-stage',
      statBoosts: { attack: 12 },
      criticalHit: true,
    },
  ],
  anger_shell: [
    {
      type: 'battle-on-damaged-stat-stage',
      statBoosts: {
        attack: 1,
        specialAttack: 1,
        speed: 1,
        defense: -1,
        specialDefense: -1,
      },
      hpCrossedAtOrBelowPercent: 50,
    },
  ],
  berserk: [
    {
      type: 'battle-on-damaged-stat-stage',
      statBoosts: { specialAttack: 1 },
      hpCrossedAtOrBelowPercent: 50,
    },
  ],
  cotton_down: [
    {
      type: 'battle-on-damaged-stat-stage',
      target: 'attacker',
      statBoosts: { speed: -1 },
    },
  ],
  electromorphosis: [
    {
      type: 'battle-on-damaged-stat-stage',
      statBoosts: { specialAttack: 1 },
    },
  ],
  gooey: [
    {
      type: 'battle-on-damaged-stat-stage',
      target: 'attacker',
      statBoosts: { speed: -1 },
    },
  ],
  rattled: [
    {
      type: 'battle-on-damaged-stat-stage',
      attackTypes: ['bug', 'dark', 'ghost'],
      statBoosts: { speed: 1 },
    },
  ],
  stamina: [
    {
      type: 'battle-on-damaged-stat-stage',
      statBoosts: { defense: 1 },
    },
  ],
  steam_engine: [
    {
      type: 'battle-on-damaged-stat-stage',
      attackTypes: ['fire', 'water'],
      statBoosts: { speed: 6 },
    },
  ],
  tangling_hair: [
    {
      type: 'battle-on-damaged-stat-stage',
      target: 'attacker',
      statBoosts: { speed: -1 },
    },
  ],
  thermal_exchange: [
    {
      type: 'battle-on-damaged-stat-stage',
      attackTypes: ['fire'],
      statBoosts: { attack: 1 },
    },
  ],
  water_compaction: [
    {
      type: 'battle-on-damaged-stat-stage',
      attackTypes: ['water'],
      statBoosts: { defense: 2 },
    },
  ],
  weak_armor: [
    {
      type: 'battle-on-damaged-stat-stage',
      statBoosts: { defense: -1, speed: 2 },
    },
  ],
  wind_power: [
    {
      type: 'battle-on-damaged-stat-stage',
      attackTypes: ['flying'],
      statBoosts: { specialAttack: 1 },
    },
  ],
}

const ABILITY_ON_DAMAGED_STATUSES: Record<
  string,
  readonly Extract<AbilityEffect, { type: 'battle-on-damaged-status' }>[]
> = {
  effect_spore: [
    {
      type: 'battle-on-damaged-status',
      target: 'attacker',
      statuses: ['sleep', 'poison', 'paralysis'],
      chance: 30,
    },
  ],
  flame_body: [
    {
      type: 'battle-on-damaged-status',
      target: 'attacker',
      statuses: ['burn'],
      chance: 30,
    },
  ],
  poison_point: [
    {
      type: 'battle-on-damaged-status',
      target: 'attacker',
      statuses: ['poison'],
      chance: 30,
    },
  ],
  static: [
    {
      type: 'battle-on-damaged-status',
      target: 'attacker',
      statuses: ['paralysis'],
      chance: 30,
    },
  ],
}

const ABILITY_ON_DAMAGED_DAMAGE: Record<
  string,
  readonly Extract<AbilityEffect, { type: 'battle-on-damaged-damage' }>[]
> = {
  iron_barbs: [
    {
      type: 'battle-on-damaged-damage',
      target: 'attacker',
      maxHpFraction: 8,
    },
  ],
  rough_skin: [
    {
      type: 'battle-on-damaged-damage',
      target: 'attacker',
      maxHpFraction: 8,
    },
  ],
}

const ABILITY_RECOIL_EFFECTS: Record<
  string,
  readonly Extract<
    AbilityEffect,
    {
      type:
        | 'battle-recoil-immunity'
        | 'battle-indirect-damage-immunity'
        | 'battle-recoil-damage-multiplier'
    }
  >[]
> = {
  magic_guard: [
    { type: 'battle-recoil-immunity' },
    { type: 'battle-indirect-damage-immunity' },
  ],
  reckless: [{ type: 'battle-recoil-damage-multiplier', multiplier: 1.2 }],
  rock_head: [{ type: 'battle-recoil-immunity' }],
}

const ABILITY_WEATHER_TURN_EFFECTS: Record<
  string,
  readonly Extract<
    AbilityEffect,
    { type: 'battle-weather-turn-heal' | 'battle-weather-turn-damage' }
  >[]
> = {
  ice_body: [
    {
      type: 'battle-weather-turn-heal',
      weather: ['hail', 'snow', 'snowstorm'],
      healPercent: 6.25,
    },
  ],
  rain_dish: [
    {
      type: 'battle-weather-turn-heal',
      weather: ['rain', 'heavy-rain', 'thunderstorm'],
      healPercent: 6.25,
    },
  ],
}

const ABILITY_MOVE_BLOCKS: Record<
  string,
  readonly Extract<AbilityEffect, { type: 'battle-move-block' }>[]
> = {
  soundproof: [{ type: 'battle-move-block', moveIds: SOUND_MOVE_IDS }],
}

function canonicalTypeBoostEffects(abilityId: string): AbilityEffect[] {
  const attackTypes = ABILITY_TYPE_DAMAGE_BOOSTS[abilityId]
  if (!attackTypes) return []
  return [{ type: 'battle-damage-multiplier', target: 'attacker', attackTypes: [...attackTypes], multiplier: 1.2 }]
}

function weatherAbilityEffects(abilityId: string): AbilityEffect[] {
  switch (abilityId) {
    case 'delta_stream':
      return [{ type: 'battle-damage-multiplier', target: 'defender', multiplier: 0.9 }]
    case 'desolate_land':
    case 'drought':
      return [{ type: 'battle-damage-multiplier', target: 'attacker', attackTypes: ['fire'], multiplier: 1.25 }]
    case 'drizzle':
    case 'primordial_sea':
      return [{ type: 'battle-damage-multiplier', target: 'attacker', attackTypes: ['water'], multiplier: 1.25 }]
    case 'electric_surge':
      return [{ type: 'battle-damage-multiplier', target: 'attacker', attackTypes: ['electric'], multiplier: 1.25 }]
    case 'grassy_surge':
    case 'seed_sower':
      return [{ type: 'battle-damage-multiplier', target: 'attacker', attackTypes: ['grass'], multiplier: 1.25 }]
    case 'misty_surge':
      return [{ type: 'battle-damage-multiplier', target: 'attacker', attackTypes: ['fairy'], multiplier: 1.25 }]
    case 'psychic_surge':
      return [{ type: 'battle-damage-multiplier', target: 'attacker', attackTypes: ['psychic'], multiplier: 1.25 }]
    case 'sand_spit':
    case 'sand_stream':
      return [{ type: 'battle-damage-multiplier', target: 'attacker', attackTypes: ['rock', 'ground', 'steel'], multiplier: 1.15 }]
    case 'snow_warning':
      return [{ type: 'battle-damage-multiplier', target: 'defender', attackTypes: ['ice'], multiplier: 0.85 }]
    default:
      return []
  }
}

function inferredStatusImmunityEffects(description: string): AbilityEffect[] {
  const statuses: string[] = []
  if (description.includes('paralysis') || description.includes('paralyzed')) statuses.push('paralysis')
  if (description.includes('poison')) statuses.push('poison', 'bad-poison')
  if (description.includes('burn')) statuses.push('burn')
  if (description.includes('sleep')) statuses.push('sleep')
  if (description.includes('freez')) statuses.push('freeze')
  if (description.includes('confus')) statuses.push('confusion')
  return statuses.length ? [{ type: 'battle-status-immunity', statuses }] : []
}

function inferredTypeEffects(description: string): AbilityEffect[] {
  for (const typeName of POKEMON_TYPES) {
    if (
      description.includes(`${typeName}-type moves`) ||
      description.includes(`${typeName}-type attacks`) ||
      description.includes(`${typeName} type moves`)
    ) {
      return [{ type: 'battle-damage-multiplier', target: 'attacker', attackTypes: [typeName], multiplier: 1.15 }]
    }
  }
  return []
}

function inferredStatEffects(description: string): AbilityEffect[] {
  if (description.includes('speed')) {
    return [{ type: 'battle-stat-multiplier', stat: 'speed', multiplier: 1.1 }]
  }
  if (description.includes('sp. atk') || description.includes('special attack')) {
    return [{ type: 'battle-stat-multiplier', stat: 'specialAttack', multiplier: 1.1 }]
  }
  if (description.includes('sp. def') || description.includes('special defense')) {
    return [{ type: 'battle-stat-multiplier', stat: 'specialDefense', multiplier: 1.1 }]
  }
  if (description.includes('defense')) {
    return [{ type: 'battle-stat-multiplier', stat: 'defense', multiplier: 1.1 }]
  }
  if (description.includes('attack')) {
    return [{ type: 'battle-stat-multiplier', stat: 'attack', multiplier: 1.1 }]
  }
  return []
}

function getBestEffortCanonicalAbilityEffects(ability: AbilityConfig): AbilityEffect[] {
  const statEffects = ABILITY_STAT_MULTIPLIERS[ability.id]
  if (statEffects?.length) return [...statEffects]

  const statStageImmunities = ABILITY_STAT_STAGE_IMMUNITIES[ability.id]
  if (statStageImmunities?.length) return [...statStageImmunities]

  const interruptImmunities = ABILITY_INTERRUPT_IMMUNITIES[ability.id]
  if (interruptImmunities?.length) return [...interruptImmunities]

  const critEffects = ABILITY_CRIT_EFFECTS[ability.id]
  if (critEffects?.length) return [...critEffects]

  const afterKoStatStages = ABILITY_AFTER_KO_STAT_STAGES[ability.id]
  if (afterKoStatStages?.length) return [...afterKoStatStages]

  const statStageDropTriggers = ABILITY_STAT_STAGE_DROP_TRIGGERS[ability.id]
  if (statStageDropTriggers?.length) return [...statStageDropTriggers]

  const statStageDropReflections = ABILITY_STAT_STAGE_DROP_REFLECTIONS[ability.id]
  if (statStageDropReflections?.length) return [...statStageDropReflections]

  const opponentStatStageBoostCopies =
    ABILITY_OPPONENT_STAT_STAGE_BOOST_COPIES[ability.id]
  if (opponentStatStageBoostCopies?.length) {
    return [...opponentStatStageBoostCopies]
  }

  const switchPreventions = ABILITY_SWITCH_PREVENTIONS[ability.id]
  if (switchPreventions?.length) return [...switchPreventions]

  const forcedSwitchImmunities = ABILITY_FORCED_SWITCH_IMMUNITIES[ability.id]
  if (forcedSwitchImmunities?.length) return [...forcedSwitchImmunities]

  const switchOutEffects = ABILITY_SWITCH_OUT_EFFECTS[ability.id]
  if (switchOutEffects?.length) return [...switchOutEffects]

  const lowHpSelfSwitches = ABILITY_LOW_HP_SELF_SWITCHES[ability.id]
  if (lowHpSelfSwitches?.length) return [...lowHpSelfSwitches]

  const outgoingDamageReductionImmunities =
    ABILITY_OUTGOING_DAMAGE_REDUCTION_IMMUNITIES[ability.id]
  if (outgoingDamageReductionImmunities?.length) {
    return [...outgoingDamageReductionImmunities]
  }

  const onDamagedStatStages = ABILITY_ON_DAMAGED_STAT_STAGES[ability.id]
  if (onDamagedStatStages?.length) return [...onDamagedStatStages]

  const onDamagedStatuses = ABILITY_ON_DAMAGED_STATUSES[ability.id]
  if (onDamagedStatuses?.length) return [...onDamagedStatuses]

  const onDamagedDamage = ABILITY_ON_DAMAGED_DAMAGE[ability.id]
  if (onDamagedDamage?.length) return [...onDamagedDamage]

  const recoilEffects = ABILITY_RECOIL_EFFECTS[ability.id]
  if (recoilEffects?.length) return [...recoilEffects]

  const weatherTurnEffects = ABILITY_WEATHER_TURN_EFFECTS[ability.id]
  if (weatherTurnEffects?.length) return [...weatherTurnEffects]

  const moveBlocks = ABILITY_MOVE_BLOCKS[ability.id]
  if (moveBlocks?.length) return [...moveBlocks]

  const damageEffects = ABILITY_DAMAGE_MULTIPLIERS[ability.id]
  if (damageEffects?.length) return [...damageEffects]

  const statusImmunities = ABILITY_STATUS_IMMUNITIES[ability.id]
  if (statusImmunities?.length) {
    return [{ type: 'battle-status-immunity', statuses: [...statusImmunities] }]
  }

  const weatherEffects = weatherAbilityEffects(ability.id)
  if (weatherEffects.length) return weatherEffects

  const typeEffects = canonicalTypeBoostEffects(ability.id)
  if (typeEffects.length) return typeEffects

  const description = `${ability.name} ${ability.description}`.toLowerCase()
  const inferredStatusEffects = inferredStatusImmunityEffects(description)
  if (inferredStatusEffects.length) return inferredStatusEffects

  const inferredTypeBoosts = inferredTypeEffects(description)
  if (inferredTypeBoosts.length) return inferredTypeBoosts

  const inferredStats = inferredStatEffects(description)
  if (inferredStats.length) return inferredStats

  if (
    description.includes('armor') ||
    description.includes('guard') ||
    description.includes('shield') ||
    description.includes('protect') ||
    description.includes('heal') ||
    description.includes('cure')
  ) {
    return [{ type: 'battle-damage-multiplier', target: 'defender', multiplier: 0.95 }]
  }

  return [{ type: 'battle-damage-multiplier', target: 'attacker', multiplier: 1.03 }]
}

export function getDefaultAbilityEffects(ability: AbilityConfig): AbilityEffect[] {
  const criteria = ability.criteria
  switch (ability.type) {
    case 'timer':
      return ability.value ? [{ type: 'timer-delta', seconds: ability.value, condition: criteria }] : []
    case 'catch':
      return ability.value
        ? [{ type: 'catch-rate-multiplier', multiplier: ability.value, condition: criteria }]
        : []
    case 'encounter':
      return ability.encounters
        ? [
            {
              type: 'encounter-replacement',
              chance: ability.rate,
              encounters: ability.encounters,
              condition: criteria,
            },
          ]
        : []
    case 'escape':
      return [{ type: 'active-escape', chance: ability.rate, condition: criteria }]
    case 'level':
      return ability.value ? [{ type: 'level-delta', levels: ability.value, condition: criteria }] : []
    case 'shiny':
      return ability.value && ability.value !== 1
        ? [{ type: 'shiny-chance-multiplier', multiplier: ability.value, condition: criteria }]
        : []
    case 'reward':
      return ability.rewards?.length
        ? [{ type: 'capture-rewards', rewards: ability.rewards, condition: criteria }]
        : []
    default:
      return []
  }
}

export function resolveAbilityEffects(ability: AbilityConfig): AbilityEffect[] {
  const explicit = [
    ...(ABILITY_EXTRA_EFFECTS_BY_ID[ability.id] || []),
    ...(ability.effects || []),
  ]
  const secondary = [...(ABILITY_SECONDARY_EFFECTS_BY_ID[ability.id] || [])]
  const authored = [...explicit, ...secondary]
  const defaults = getDefaultAbilityEffects(ability).filter((effect) => {
    if (effect.type === 'capture-rewards') return !hasExplicitEffect(authored, 'capture-rewards')
    if (effect.type === 'catch-rate-multiplier') {
      return !hasExplicitEffect(authored, 'catch-rate-multiplier')
    }
    if (effect.type === 'timer-delta') return !hasExplicitEffect(authored, 'timer-delta')
    if (effect.type === 'encounter-replacement') {
      return !hasExplicitEffect(authored, 'encounter-replacement')
    }
    return !hasExplicitEffect(authored, effect.type)
  })
  const fallback = explicit.length || defaults.length ? [] : getBestEffortCanonicalAbilityEffects(ability)
  const merged = [...explicit, ...defaults, ...fallback, ...secondary]
  if (hasExplicitEffect(merged, 'battle-no-single-battle-effect')) {
    return merged.filter(
      (effect) =>
        effect.type !== 'battle-damage-multiplier' &&
        effect.type !== 'battle-stat-multiplier',
    )
  }
  return merged
}
