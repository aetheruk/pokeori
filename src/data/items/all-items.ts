import { Item } from './types'
import { ballItems } from './entries/balls'
import { healingItems } from './entries/healing'
import { vitaminItems } from './entries/vitamins'
import { candyItems } from './entries/candies'
import { keyItems } from './entries/key-items'
import { battleItems } from './entries/battle'
import { badgeItems } from './entries/badges'
import { binderItems } from './entries/binders'
import { encounterItems } from './entries/encounters'
import { megaStones } from './entries/mega-stones'
import { valuableItems } from './entries/valuables'
import { evolutionItems } from './entries/evolution'
import { tmItems } from './entries/tms'
import { victorySymbols } from './entries/victory'
import { scratchCardItems } from './entries/scratch-cards'
import { berryItems } from './entries/berries'
import { abilityPatchItems } from './entries/ability-patches'
import { researchItems } from './entries/research'
import { boosterPackItems } from './entries/booster-packs'
import { artisanItems } from './entries/artisan'

export const items: Item[] = [
  ...keyItems,
  ...ballItems,
  ...candyItems,
  ...vitaminItems,
  ...healingItems,
  ...battleItems,
  ...badgeItems,
  ...binderItems,
  ...encounterItems,
  ...megaStones,
  ...valuableItems,
  ...evolutionItems,
  ...tmItems,
  ...victorySymbols,
  ...scratchCardItems,
  ...berryItems,
  ...abilityPatchItems,
  ...researchItems,
  ...boosterPackItems,
  ...artisanItems,
]
