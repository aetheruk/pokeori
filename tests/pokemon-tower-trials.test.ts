import { describe, expect, test } from 'bun:test'
import {
  pokemonTowerBattles,
  pokemonTowerGauntletBattles,
} from '@/data/battles/entries/pokemon-tower'
import { gauntletGridAdventureEntries } from '@/data/games/rock-push/entries/gauntlets'
import { pokemonTowerLocations } from '@/data/locations/entries/pokemon-tower'
import { resolveTrainerBattleItemUseLimit, resolveTrainerBattleMoveUseLimit } from '@/utilities/skills/unlocks'

const trial = (name: string) => pokemonTowerBattles.find((battle) => battle.id === `pokemon-tower-channeler-${name}`)!

describe('Pokemon Tower spirit trials', () => {
  test('authors all thirteen rules without changing the trainer completion chain', () => {
    const names = ['hope', 'patricia', 'carly', 'laurel', 'jody', 'paula', 'ruth', 'karina', 'tammy', 'janae', 'angelica', 'jennifer', 'emilia']
    expect(pokemonTowerBattles.filter((battle) => battle.id.startsWith('pokemon-tower-channeler-'))).toHaveLength(13)
    for (let index = 1; index < names.length; index++) {
      expect(trial(names[index]).requirements).toContainEqual({
        type: 'battle_result', targetId: trial(names[index - 1]).id, battleStatus: 'win', count: 1,
      })
    }
    expect(trial('hope').playerTeamInitialStatus).toBe('paralysis')
    expect(trial('patricia').allowedPlayerTypes).toEqual(['grass'])
    expect(trial('carly').maxPokemon).toBe(1)
    expect(trial('laurel').allowSwapping).toBe(false)
    expect(trial('jody').playerTeamInitialStatus).toBe('poison')
    expect(trial('paula').itemsPerBattle).toBe(1)
    expect(trial('ruth').enemyTeam[0].initialStatus).toBe('sleep')
    expect(trial('karina').allowedPlayerTypes).toEqual(['water'])
    expect(trial('tammy').playerTeamInitialStatus).toBe('burn')
    expect(trial('janae').enemyTeam[0].initialStatus).toBe('confusion')
    expect(trial('angelica').format).toBe('double')
    expect(trial('jennifer').itemsPerBattle).toBe(0)
    expect(trial('emilia').movesPerBattle).toBe(1)
    expect(pokemonTowerBattles.find((battle) => battle.id === 'pokemon-tower-shadow-surge-1')?.requirements).toContainEqual({
      type: 'battle_result', targetId: trial('emilia').id, battleStatus: 'win', count: 1,
    })
  })

  test('resource trials cap existing allowances, including a genuine zero item limit', () => {
    expect(resolveTrainerBattleItemUseLimit(100, trial('paula').itemsPerBattle)).toBe(1)
    expect(resolveTrainerBattleItemUseLimit(100, trial('jennifer').itemsPerBattle)).toBe(0)
    expect(resolveTrainerBattleMoveUseLimit(100, trial('emilia').movesPerBattle)).toBe(1)
    expect(resolveTrainerBattleMoveUseLimit(1, trial('emilia').movesPerBattle)).toBeLessThanOrEqual(1)
  })

  test('Grid Adventure rematches reserve Pokedollars for the end prize', () => {
    expect(pokemonTowerGauntletBattles).toHaveLength(13)
    expect(
      pokemonTowerGauntletBattles.some((battle) =>
        battle.rewards?.some(
          (reward) => reward.type === 'currency' && reward.targetId === 'pokedollars',
        ),
      ),
    ).toBe(false)
    expect(
      trial('hope').rewards?.some(
        (reward) => reward.type === 'currency' && reward.targetId === 'pokedollars',
      ),
    ).toBe(true)
  })

  test('Ghost Trial uses its pinned roll for a rare Gengar catch run', () => {
    const adventure = gauntletGridAdventureEntries.find(
      (entry) => entry.id === 'pokemon-tower-ghost-trial-grid-adventure',
    )!
    const placements = adventure.settings.screens?.[0]?.objects || []
    const standardTrainers = placements.filter((placement) =>
      placement.randomGroup?.id === 'tower-channeler-standard-pool',
    )
    const rareTrainers = placements.filter((placement) =>
      placement.randomGroup?.id === 'tower-channeler-gengar-pool',
    )
    const gengar = placements.filter((placement) =>
      placement.interaction?.targetId === 'pokemon-tower-ghost-trial-gengar',
    )
    const gengarLocation = pokemonTowerLocations.find(
      (location) => location.id === 'pokemon-tower-ghost-trial-gengar',
    )

    expect(adventure.settings.winCondition).toEqual({
      type: 'activity-successes',
      count: 5,
    })
    expect(standardTrainers).toHaveLength(13)
    expect(standardTrainers.every((placement) =>
      placement.randomGroup?.selectCount === 5 &&
      placement.requirements?.some((requirement) =>
        requirement.type === 'roll' && requirement.count === 66_667 && requirement.inverse,
      ),
    )).toBe(true)
    expect(rareTrainers).toHaveLength(13)
    expect(rareTrainers.every((placement) =>
      placement.randomGroup?.selectCount === 4 &&
      placement.requirements?.some((requirement) =>
        requirement.type === 'roll' && requirement.count === 66_667 && !requirement.inverse,
      ),
    )).toBe(true)
    expect(gengar).toHaveLength(1)
    expect(gengar[0]).toMatchObject({
      objectId: 'gengar-encounter-trigger',
      requirements: [{ type: 'roll', count: 66_667 }],
      interaction: {
        type: 'encounter',
        targetId: 'pokemon-tower-ghost-trial-gengar',
        victory: 'clear',
      },
    })
    expect(gengarLocation).toMatchObject({
      gridAdventureOnly: true,
      encounters: [{ speciesId: 94, formId: '94', chance: 100 }],
    })
  })
})
