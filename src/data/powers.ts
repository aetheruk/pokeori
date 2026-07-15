/**
 * Battle Powers System
 *
 * This file contains data and utilities for the special battle powers:
 * - Terastallization (Tera Orb)
 * - Mega Evolution (Mega Stones)
 * - Z-Moves (Z-Ring)
 * - Dynamax/Gigantamax
 */

// Key items that unlock each power system
export const POWER_KEY_ITEMS = {
  tera: 'tera-orb',
  mega: 'mega-bracelet',
  zMove: 'z-ring',
  dynamax: 'dynamax-band',
  victory: 'v-crown',
  weather: 'weather-orb',
} as const

export const WEATHER_POWER_ITEM_IDS = {
  clear: 'weather-core-clear',
  'harsh-sunlight': 'weather-core-harsh-sunlight',
  'extremely-harsh-sunlight': 'weather-core-extreme-sunlight',
  rain: 'weather-core-rain',
  'heavy-rain': 'weather-core-heavy-rain',
  thunderstorm: 'weather-core-thunderstorm',
  sandstorm: 'weather-core-sandstorm',
  hail: 'weather-core-hail',
  snow: 'weather-core-snow',
  snowstorm: 'weather-core-snowstorm',
  fog: 'weather-core-fog',
  'strong-winds': 'weather-core-strong-winds',
  'shadowy-aura': 'weather-core-shadowy-aura',
} as const

/**
 * Mega Evolution Data
 * Maps base Pokémon form IDs to their mega evolution data
 */
export interface MegaEvolutionEntry {
  baseFormId: string
  megaFormId: string
  megaStoneId: string
  megaStoneName: string
}

export const MEGA_EVOLUTIONS: MegaEvolutionEntry[] = [
  { baseFormId: '3', megaFormId: '10033', megaStoneId: 'venusaurite', megaStoneName: 'Venusaurite' },
  { baseFormId: '6', megaFormId: '10034', megaStoneId: 'charizardite-x', megaStoneName: 'Charizardite X' },
  { baseFormId: '6', megaFormId: '10035', megaStoneId: 'charizardite-y', megaStoneName: 'Charizardite Y' },
  { baseFormId: '9', megaFormId: '10036', megaStoneId: 'blastoisinite', megaStoneName: 'Blastoisinite' },
  { baseFormId: '15', megaFormId: '10090', megaStoneId: 'beedrillite', megaStoneName: 'Beedrillite' },
  { baseFormId: '18', megaFormId: '10073', megaStoneId: 'pidgeotite', megaStoneName: 'Pidgeotite' },
  { baseFormId: '26', megaFormId: '10304', megaStoneId: 'raichu-xite', megaStoneName: 'Raichu Xite' },
  { baseFormId: '26', megaFormId: '10305', megaStoneId: 'raichu-yite', megaStoneName: 'Raichu Yite' },
  { baseFormId: '36', megaFormId: '10278', megaStoneId: 'clefablite', megaStoneName: 'Clefablite' },
  { baseFormId: '65', megaFormId: '10037', megaStoneId: 'alakazite', megaStoneName: 'Alakazite' },
  { baseFormId: '71', megaFormId: '10279', megaStoneId: 'victreebelite', megaStoneName: 'Victreebelite' },
  { baseFormId: '80', megaFormId: '10071', megaStoneId: 'slowbronite', megaStoneName: 'Slowbronite' },
  { baseFormId: '94', megaFormId: '10038', megaStoneId: 'gengarite', megaStoneName: 'Gengarite' },
  { baseFormId: '115', megaFormId: '10039', megaStoneId: 'kangaskhanite', megaStoneName: 'Kangaskhanite' },
  { baseFormId: '121', megaFormId: '10280', megaStoneId: 'starmieite', megaStoneName: 'Starmieite' },
  { baseFormId: '127', megaFormId: '10040', megaStoneId: 'pinsirite', megaStoneName: 'Pinsirite' },
  { baseFormId: '130', megaFormId: '10041', megaStoneId: 'gyaradosite', megaStoneName: 'Gyaradosite' },
  { baseFormId: '142', megaFormId: '10042', megaStoneId: 'aerodactylite', megaStoneName: 'Aerodactylite' },
  { baseFormId: '149', megaFormId: '10281', megaStoneId: 'dragonitite', megaStoneName: 'Dragonitite' },
  { baseFormId: '150', megaFormId: '10043', megaStoneId: 'mewtwonite-x', megaStoneName: 'Mewtwonite X' },
  { baseFormId: '150', megaFormId: '10044', megaStoneId: 'mewtwonite-y', megaStoneName: 'Mewtwonite Y' },
  { baseFormId: '154', megaFormId: '10282', megaStoneId: 'meganiumite', megaStoneName: 'Meganiumite' },
  { baseFormId: '160', megaFormId: '10283', megaStoneId: 'feraligatrite', megaStoneName: 'Feraligatrite' },
  { baseFormId: '181', megaFormId: '10045', megaStoneId: 'ampharosite', megaStoneName: 'Ampharosite' },
  { baseFormId: '208', megaFormId: '10072', megaStoneId: 'steelixite', megaStoneName: 'Steelixite' },
  { baseFormId: '212', megaFormId: '10046', megaStoneId: 'scizorite', megaStoneName: 'Scizorite' },
  { baseFormId: '214', megaFormId: '10047', megaStoneId: 'heracronite', megaStoneName: 'Heracronite' },
  { baseFormId: '227', megaFormId: '10284', megaStoneId: 'skarmoryite', megaStoneName: 'Skarmoryite' },
  { baseFormId: '229', megaFormId: '10048', megaStoneId: 'houndoominite', megaStoneName: 'Houndoominite' },
  { baseFormId: '248', megaFormId: '10049', megaStoneId: 'tyranitarite', megaStoneName: 'Tyranitarite' },
  { baseFormId: '254', megaFormId: '10065', megaStoneId: 'sceptilite', megaStoneName: 'Sceptilite' },
  { baseFormId: '257', megaFormId: '10050', megaStoneId: 'blazikenite', megaStoneName: 'Blazikenite' },
  { baseFormId: '260', megaFormId: '10064', megaStoneId: 'swampertite', megaStoneName: 'Swampertite' },
  { baseFormId: '282', megaFormId: '10051', megaStoneId: 'gardevoirite', megaStoneName: 'Gardevoirite' },
  { baseFormId: '302', megaFormId: '10066', megaStoneId: 'sablenite', megaStoneName: 'Sablenite' },
  { baseFormId: '303', megaFormId: '10052', megaStoneId: 'mawilite', megaStoneName: 'Mawilite' },
  { baseFormId: '306', megaFormId: '10053', megaStoneId: 'aggronite', megaStoneName: 'Aggronite' },
  { baseFormId: '308', megaFormId: '10054', megaStoneId: 'medichamite', megaStoneName: 'Medichamite' },
  { baseFormId: '310', megaFormId: '10055', megaStoneId: 'manectite', megaStoneName: 'Manectite' },
  { baseFormId: '319', megaFormId: '10070', megaStoneId: 'sharpedonite', megaStoneName: 'Sharpedonite' },
  { baseFormId: '323', megaFormId: '10087', megaStoneId: 'cameruptite', megaStoneName: 'Cameruptite' },
  { baseFormId: '334', megaFormId: '10067', megaStoneId: 'altarianite', megaStoneName: 'Altarianite' },
  { baseFormId: '354', megaFormId: '10056', megaStoneId: 'banettite', megaStoneName: 'Banettite' },
  { baseFormId: '358', megaFormId: '10306', megaStoneId: 'chimechoite', megaStoneName: 'Chimechoite' },
  { baseFormId: '359', megaFormId: '10057', megaStoneId: 'absolite', megaStoneName: 'Absolite' },
  { baseFormId: '359', megaFormId: '10307', megaStoneId: 'absol-zite', megaStoneName: 'Absol Zite' },
  { baseFormId: '362', megaFormId: '10074', megaStoneId: 'glalitite', megaStoneName: 'Glalitite' },
  { baseFormId: '373', megaFormId: '10089', megaStoneId: 'salamencite', megaStoneName: 'Salamencite' },
  { baseFormId: '376', megaFormId: '10076', megaStoneId: 'metagrossite', megaStoneName: 'Metagrossite' },
  { baseFormId: '380', megaFormId: '10062', megaStoneId: 'latiasite', megaStoneName: 'Latiasite' },
  { baseFormId: '381', megaFormId: '10063', megaStoneId: 'latiosite', megaStoneName: 'Latiosite' },
  { baseFormId: '382', megaFormId: '1014', megaStoneId: 'blue-orb', megaStoneName: 'Blue Orb' },
  { baseFormId: '383', megaFormId: '1015', megaStoneId: 'red-orb', megaStoneName: 'Red Orb' },
  { baseFormId: '384', megaFormId: '10079', megaStoneId: 'rayquazite', megaStoneName: 'Rayquazite' },
  { baseFormId: '398', megaFormId: '10308', megaStoneId: 'staraptorite', megaStoneName: 'Staraptorite' },
  { baseFormId: '428', megaFormId: '10088', megaStoneId: 'lopunnite', megaStoneName: 'Lopunnite' },
  { baseFormId: '445', megaFormId: '10058', megaStoneId: 'garchompite', megaStoneName: 'Garchompite' },
  { baseFormId: '445', megaFormId: '10309', megaStoneId: 'garchomp-zite', megaStoneName: 'Garchomp Zite' },
  { baseFormId: '448', megaFormId: '10059', megaStoneId: 'lucarionite', megaStoneName: 'Lucarionite' },
  { baseFormId: '448', megaFormId: '10310', megaStoneId: 'lucario-zite', megaStoneName: 'Lucario Zite' },
  { baseFormId: '460', megaFormId: '10060', megaStoneId: 'abomasite', megaStoneName: 'Abomasite' },
  { baseFormId: '475', megaFormId: '10068', megaStoneId: 'galladite', megaStoneName: 'Galladite' },
  { baseFormId: '478', megaFormId: '10285', megaStoneId: 'froslassite', megaStoneName: 'Froslassite' },
  { baseFormId: '485', megaFormId: '10311', megaStoneId: 'heatranite', megaStoneName: 'Heatranite' },
  { baseFormId: '491', megaFormId: '10312', megaStoneId: 'darkraiite', megaStoneName: 'Darkraiite' },
  { baseFormId: '500', megaFormId: '10286', megaStoneId: 'emboarite', megaStoneName: 'Emboarite' },
  { baseFormId: '530', megaFormId: '10287', megaStoneId: 'excadrillite', megaStoneName: 'Excadrillite' },
  { baseFormId: '531', megaFormId: '10069', megaStoneId: 'audinite', megaStoneName: 'Audinite' },
  { baseFormId: '545', megaFormId: '10288', megaStoneId: 'scolipedite', megaStoneName: 'Scolipedite' },
  { baseFormId: '560', megaFormId: '10289', megaStoneId: 'scraftyite', megaStoneName: 'Scraftyite' },
  { baseFormId: '604', megaFormId: '10290', megaStoneId: 'eelektrossite', megaStoneName: 'Eelektrossite' },
  { baseFormId: '609', megaFormId: '10291', megaStoneId: 'chandelurite', megaStoneName: 'Chandelurite' },
  { baseFormId: '623', megaFormId: '10313', megaStoneId: 'golurkite', megaStoneName: 'Golurkite' },
  { baseFormId: '652', megaFormId: '10292', megaStoneId: 'chesnaughtite', megaStoneName: 'Chesnaughtite' },
  { baseFormId: '655', megaFormId: '10293', megaStoneId: 'delphoxite', megaStoneName: 'Delphoxite' },
  { baseFormId: '658', megaFormId: '10294', megaStoneId: 'greninjite', megaStoneName: 'Greninjite' },
  { baseFormId: '668', megaFormId: '10295', megaStoneId: 'pyroarite', megaStoneName: 'Pyroarite' },
  { baseFormId: '670', megaFormId: '10296', megaStoneId: 'floettite', megaStoneName: 'Floettite' },
  { baseFormId: '678', megaFormId: '10314', megaStoneId: 'meowsticite', megaStoneName: 'Meowsticite' },
  { baseFormId: '687', megaFormId: '10297', megaStoneId: 'malamarite', megaStoneName: 'Malamarite' },
  { baseFormId: '689', megaFormId: '10298', megaStoneId: 'barbaraclite', megaStoneName: 'Barbaraclite' },
  { baseFormId: '691', megaFormId: '10299', megaStoneId: 'dragalgite', megaStoneName: 'Dragalgite' },
  { baseFormId: '701', megaFormId: '10300', megaStoneId: 'hawluchite', megaStoneName: 'Hawluchite' },
  { baseFormId: '718', megaFormId: '10301', megaStoneId: 'zygardeite', megaStoneName: 'Zygardeite' },
  { baseFormId: '719', megaFormId: '10075', megaStoneId: 'diancite', megaStoneName: 'Diancite' },
  { baseFormId: '740', megaFormId: '10315', megaStoneId: 'crabominableite', megaStoneName: 'Crabominableite' },
  { baseFormId: '768', megaFormId: '10316', megaStoneId: 'golisopodite', megaStoneName: 'Golisopodite' },
  { baseFormId: '780', megaFormId: '10302', megaStoneId: 'drampite', megaStoneName: 'Drampite' },
  { baseFormId: '801', megaFormId: '10317', megaStoneId: 'magearnaite', megaStoneName: 'Magearnaite' },
  { baseFormId: '801', megaFormId: '10318', megaStoneId: 'original-magearnaite', megaStoneName: 'Original Magearnaite' },
  { baseFormId: '807', megaFormId: '10319', megaStoneId: 'zeraoraite', megaStoneName: 'Zeraoraite' },
  { baseFormId: '870', megaFormId: '10303', megaStoneId: 'falinksrite', megaStoneName: 'Falinksrite' },
  { baseFormId: '952', megaFormId: '10320', megaStoneId: 'scovillainite', megaStoneName: 'Scovillainite' },
  { baseFormId: '970', megaFormId: '10321', megaStoneId: 'glimmoraite', megaStoneName: 'Glimmoraite' },
  { baseFormId: '978', megaFormId: '10322', megaStoneId: 'curly-tatsugiriite', megaStoneName: 'Curly Tatsugiriite' },
  { baseFormId: '978', megaFormId: '10323', megaStoneId: 'droopy-tatsugiriite', megaStoneName: 'Droopy Tatsugiriite' },
  { baseFormId: '978', megaFormId: '10324', megaStoneId: 'stretchy-tatsugiriite', megaStoneName: 'Stretchy Tatsugiriite' },
  { baseFormId: '998', megaFormId: '10325', megaStoneId: 'baxcaliburite', megaStoneName: 'Baxcaliburite' },
]

/**
 * Get mega evolution data for a Pokemon
 */
export function getMegaEvolutions(baseFormId: string): MegaEvolutionEntry[] {
  return MEGA_EVOLUTIONS.filter((entry) => entry.baseFormId === baseFormId)
}

/**
 * Check if a Pokemon can mega evolve
 */
export function canMegaEvolve(baseFormId: string): boolean {
  return MEGA_EVOLUTIONS.some((entry) => entry.baseFormId === baseFormId)
}

/**
 * Get the mega stone required for a specific mega evolution
 */
export function getMegaStoneForEvolution(megaFormId: string): string | undefined {
  const entry = MEGA_EVOLUTIONS.find((e) => e.megaFormId === megaFormId)
  return entry?.megaStoneId
}

/**
 * Gigantamax Data
 * Maps base Pokémon form IDs to their Gigantamax forms
 */
export interface GigantamaxEntry {
  baseFormId: string
  gmaxFormId: string
}

export const GIGANTAMAX_POKEMON: GigantamaxEntry[] = [
  { baseFormId: '3', gmaxFormId: '10195' }, // Venusaur
  { baseFormId: '6', gmaxFormId: '10196' }, // Charizard
  { baseFormId: '9', gmaxFormId: '10197' }, // Blastoise
  { baseFormId: '12', gmaxFormId: '10198' }, // Butterfree
  { baseFormId: '25', gmaxFormId: '10199' }, // Pikachu
  { baseFormId: '52', gmaxFormId: '10200' }, // Meowth
  { baseFormId: '68', gmaxFormId: '10201' }, // Machamp
  { baseFormId: '94', gmaxFormId: '10202' }, // Gengar
  { baseFormId: '99', gmaxFormId: '10203' }, // Kingler
  { baseFormId: '131', gmaxFormId: '10204' }, // Lapras
  { baseFormId: '133', gmaxFormId: '10205' }, // Eevee
  { baseFormId: '143', gmaxFormId: '10206' }, // Snorlax
  { baseFormId: '569', gmaxFormId: '10207' }, // Garbodor
  { baseFormId: '809', gmaxFormId: '10208' }, // Melmetal
  { baseFormId: '812', gmaxFormId: '10209' }, // Rillaboom
  { baseFormId: '815', gmaxFormId: '10210' }, // Cinderace
  { baseFormId: '818', gmaxFormId: '10211' }, // Inteleon
  { baseFormId: '823', gmaxFormId: '10212' }, // Corviknight
  { baseFormId: '826', gmaxFormId: '10213' }, // Orbeetle
  { baseFormId: '834', gmaxFormId: '10214' }, // Drednaw
  { baseFormId: '839', gmaxFormId: '10215' }, // Coalossal
  { baseFormId: '841', gmaxFormId: '10216' }, // Flapple
  { baseFormId: '842', gmaxFormId: '10217' }, // Appletun
  { baseFormId: '844', gmaxFormId: '10218' }, // Sandaconda
  { baseFormId: '849', gmaxFormId: '10219' }, // Toxtricity (Amped)
  { baseFormId: '851', gmaxFormId: '10220' }, // Centiskorch
  { baseFormId: '858', gmaxFormId: '10221' }, // Hatterene
  { baseFormId: '861', gmaxFormId: '10222' }, // Grimmsnarl
  { baseFormId: '869', gmaxFormId: '10223' }, // Alcremie
  { baseFormId: '879', gmaxFormId: '10224' }, // Copperajah
  { baseFormId: '884', gmaxFormId: '10225' }, // Duraludon
  { baseFormId: '892', gmaxFormId: '10226' }, // Urshifu (Single Strike)
]

/**
 * Check if a Pokemon can Gigantamax
 */
export function canGigantamax(baseFormId: string): boolean {
  return GIGANTAMAX_POKEMON.some((entry) => entry.baseFormId === baseFormId)
}

/**
 * Get Gigantamax form ID for a Pokemon
 */
export function getGigantamaxForm(baseFormId: string): string | undefined {
  const entry = GIGANTAMAX_POKEMON.find((e) => e.baseFormId === baseFormId)
  return entry?.gmaxFormId
}

/**
 * Powers State for tracking in battle
 */
export interface PowersState {
  // Moves
  moveUsesRemaining: number // Default 3 (or from config)
  // Tera
  teraUsesRemaining: number // Default 0 per battle
  // Mega Evolution
  megaUsesRemaining: number // Allow limiting # of mega evolutions per battle (default 0)
  megaEvolved: boolean // Has a Pokemon mega evolved this battle?
  megaTurnsRemaining: number // Legacy field; Mega Evolution lasts until battle end
  megaFormId?: string // The mega form the Pokemon transformed into
  // Z-Move
  zMoveUsesRemaining: number // Allow limiting # of Z-Moves per battle (default 1)
  zMoveUsed: boolean // Legacy boolean, can be derived or kept for simplified checking of "active" turn? No, Z-move is instant.
  // Dynamax
  dynamaxAvailable: boolean // Unlocked after 5 turns
  dynamaxActive: boolean
  dynamaxTurnsRemaining: number // 3 turns
  dynamaxUsesRemaining: number // Allow limiting # of dynamaxes per battle (default 1)
  gigantamaxFormId?: string // If Gigantamax capable
  turnsPlayedThisBattle: number // Track for Dynamax unlock
  // Victory Power
  victoryUsesRemaining: number // Default 1 per battle
  // Weather Power
  weatherUsesRemaining: number // Default 1
  // Shout Power
  shoutUsesRemaining: number // Default 1
  // Circadian Power
  circadianUsesRemaining: number // Default 1
  // Dimensional Shift
  dimensionalShift: {
    charges: {
      wins: number
      losses: number
      draws: number
    }
    activeEffect?: {
      type: 'time' | 'space' | 'chaos'
      turnsRemaining: number
    }
  }
}

/**
 * Create initial powers state
 */
export function createInitialPowersState(config?: {
  movesPerBattle?: number
  teraUsesPerBattle?: number
  dynamaxPerBattle?: number
  megaEvolutionsPerBattle?: number
  zMovesPerBattle?: number
  victoryUses?: number
  weatherUses?: number
  shoutUses?: number
  circadianUses?: number
}): PowersState {
  return {
    moveUsesRemaining: config?.movesPerBattle ?? 2,
    teraUsesRemaining: config?.teraUsesPerBattle ?? 1,
    megaUsesRemaining: config?.megaEvolutionsPerBattle ?? 1,
    megaEvolved: false,
    megaTurnsRemaining: 0,
    zMoveUsesRemaining: config?.zMovesPerBattle ?? 1,
    zMoveUsed: false,
    dynamaxAvailable: false,
    dynamaxActive: false,
    dynamaxTurnsRemaining: 0,
    dynamaxUsesRemaining: config?.dynamaxPerBattle ?? 1,
    turnsPlayedThisBattle: 0,
    victoryUsesRemaining: config?.victoryUses ?? 1,
    weatherUsesRemaining: config?.weatherUses ?? 1,
    shoutUsesRemaining: config?.shoutUses ?? 1,
    circadianUsesRemaining: config?.circadianUses ?? 1,
    dimensionalShift: {
      charges: { wins: 0, losses: 0, draws: 0 },
    },
  }
}

/**
 * Dynamax HP multiplier
 */
export const DYNAMAX_HP_MULTIPLIER = 1.5

/**
 * Dynamax duration in turns
 */
export const DYNAMAX_DURATION = 3

/**
 * Turns required to unlock Dynamax
 */
export const DYNAMAX_UNLOCK_TURNS = 5

/**
 * Z-Move damage multiplier
 */
export { Z_MOVE_DAMAGE_MULTIPLIER } from '@/utilities/battle/z-move'
