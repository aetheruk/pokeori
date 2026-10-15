import { describe, expect, test } from 'bun:test'
import { pokemonTowerBattles } from '@/data/battles/entries/pokemon-tower'
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
})
