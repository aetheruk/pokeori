import { describe, expect, test } from 'bun:test'
import { renderToStaticMarkup } from 'react-dom/server'
import { BattleLog } from '@/app/(frontend)/game/battles/_components/battle-log'
import { HealthDisplay } from '@/app/(frontend)/game/battles/_components/health-display'
import { StanceSelector } from '@/app/(frontend)/game/battles/_components/stance-selector'
import { STANCE_ICON_CONFIG } from '@/components/game/shared/stance-icon'
import {
  getBattleMoveTriggerItemId,
  getMoveEffectivePower,
} from '@/utilities/battle/move-presentation'
import { getItemSpriteUrl } from '@/data/items'
import { getBattleStatusChip } from '@/utilities/battle/status-presentation'
import type { BattleLogEntry } from '@/utilities/battle/types'

describe('battle UI stance styling', () => {
  test('keeps the shared stance palette aligned with battle identity', () => {
    expect(STANCE_ICON_CONFIG.speed.tone).toBe('text-game-ochre')
    expect(STANCE_ICON_CONFIG.power.tone).toBe('text-game-clay-strong')
    expect(STANCE_ICON_CONFIG.tech.tone).toBe('text-game-stance-blue-strong')
  })

  test('labels stance attacks with their offensive stats and counter matchups', () => {
    const markup = renderToStaticMarkup(
      <StanceSelector
        onSelect={() => undefined}
        stats={{
          attack: 42,
          defense: 31,
          speed: 55,
          specialAttack: 47,
          specialDefense: 38,
        }}
      />,
    )

    expect(markup).toContain('aria-label="Use Normal Strike. Speed stance, Speed 55. Beats Power"')
    expect(markup).toContain('aria-label="Use Normal Tackle. Power stance, Attack 42. Beats Tech"')
    expect(markup).toContain(
      'aria-label="Use Normal Gambit. Tech stance, Sp. Atk 47. Beats Speed"',
    )
    expect(markup).toContain('>Normal Strike<')
    expect(markup).toContain('>Normal Tackle<')
    expect(markup).toContain('>Normal Gambit<')
    expect(markup).not.toContain('>Attack<')
    expect(markup).not.toContain('>Sp. Atk<')
    expect(markup).not.toContain('animate-pulse')
  })
})

describe('battle move and status presentation', () => {
  test('resolves the same existing TM icon for single and double battle type names', () => {
    for (const type of ['Normal', 'Fire', 'Electric', 'Ghost']) {
      expect(getItemSpriteUrl(getBattleMoveTriggerItemId([type]))).toBe(
        `/sprites/items/tm/tm-${type.toLowerCase()}.avif`,
      )
    }
    expect(getBattleMoveTriggerItemId()).toBe('tm-normal')
  })

  test('compares move power using the matching staged offensive stat', () => {
    const stats = {
      attack: 40,
      speed: 50,
      specialAttack: 60,
    }
    const stages = {
      attack: 1,
      speed: 0,
      specialAttack: -1,
    }

    expect(
      getMoveEffectivePower({ stance: 'power', damage: 1.5 }, stats, stages),
    ).toBe('90')
    expect(
      getMoveEffectivePower({ stance: 'tech', damage: 1 }, stats, stages),
    ).toBe('40')
    expect(
      getMoveEffectivePower({ stance: 'random', damage: 1 }, stats, stages),
    ).toBe('40–60')
    expect(
      getMoveEffectivePower({ stance: 'speed', damage: 0 }, stats, stages),
    ).toBe('Status')
  })

  test('uses distinct contrast-safe status chip pairs and display names', () => {
    expect(getBattleStatusChip('paralysis')).toEqual({
      className: 'border-amber-700/30 bg-amber-300 text-slate-950',
      label: 'Paralysis',
    })
    expect(getBattleStatusChip('bad-poison')).toEqual({
      className: 'border-purple-950/35 bg-purple-900 text-white',
      label: 'Bad Poison',
    })
    expect(getBattleStatusChip('mystic-veil')).toEqual({
      className: 'border-indigo-800/25 bg-indigo-200 text-indigo-950',
      label: 'Mystic Veil',
    })

    const markup = renderToStaticMarkup(
      <HealthDisplay
        currentHp={30}
        maxHp={50}
        name="Pikachu"
        level={20}
        status={{ id: 'paralysis', counter: 0 }}
      />,
    )

    expect(markup).toContain('bg-amber-300')
    expect(markup).toContain('text-slate-950')
    expect(markup).toContain('>Paralysis<')

    const fullHpMarkup = renderToStaticMarkup(
      <HealthDisplay currentHp={50} maxHp={50} name="Pikachu" level={20} />,
    )
    expect(fullHpMarkup).toContain('bg-game-health')
  })

  test('shows gender symbols beside gendered Pokemon names', () => {
    const femaleMarkup = renderToStaticMarkup(
      <HealthDisplay
        currentHp={30}
        maxHp={50}
        name="Nidoran"
        level={20}
        gender="female"
      />,
    )
    const maleMarkup = renderToStaticMarkup(
      <HealthDisplay
        currentHp={30}
        maxHp={50}
        name="Nidoran"
        level={20}
        gender="male"
      />,
    )
    const genderlessMarkup = renderToStaticMarkup(
      <HealthDisplay
        currentHp={30}
        maxHp={50}
        name="Staryu"
        level={20}
        gender="genderless"
      />,
    )

    expect(femaleMarkup).toContain('aria-label="Female"')
    expect(femaleMarkup).toContain('text-pink-600')
    expect(femaleMarkup).toContain('lucide-venus')
    expect(maleMarkup).toContain('aria-label="Male"')
    expect(maleMarkup).toContain('text-blue-600')
    expect(maleMarkup).toContain('lucide-mars')
    expect(genderlessMarkup).not.toContain('aria-label="Female"')
    expect(genderlessMarkup).not.toContain('aria-label="Male"')
  })

  test('centres strong stance outcomes above their battle actions', () => {
    const markup = renderToStaticMarkup(
      <BattleLog
        logs={[
          {
            turn: 1,
            playerStance: 'power',
            enemyStance: 'tech',
            result: 'win',
            damageDealt: 20,
            damageTaken: 0,
            message:
              'Player: Pikachu uses Attack. [icon:stance:power] [icon:type:electric]',
          },
          {
            turn: 2,
            playerStance: 'speed',
            enemyStance: 'power',
            result: 'loss',
            damageDealt: 0,
            damageTaken: 20,
            message:
              'Enemy: Eevee uses Attack. [icon:stance:power] [icon:type:normal]',
          },
          {
            turn: 3,
            playerStance: 'tech',
            enemyStance: 'tech',
            result: 'tie',
            damageDealt: 0,
            damageTaken: 0,
            message:
              'Player: Pikachu uses Attack. [icon:stance:tech] [icon:type:electric]',
          },
        ]}
      />,
    )

    expect(markup).toContain('justify-center')
    expect(markup).toContain('data-result="win"')
    expect(markup).toContain('data-result="loss"')
    expect(markup).toContain('data-result="tie"')
    expect(markup).toContain('>STANCE WIN<')
    expect(markup).toContain('>STANCE LOSS<')
    expect(markup).toContain('>STANCE DRAW<')
    expect(markup).toContain('font-bold')
  })

  test('does not label opening send-out setup as a draw', () => {
    const markup = renderToStaticMarkup(
      <BattleLog
        logs={[
          {
            turn: 1,
            playerStance: 'tech',
            enemyStance: 'tech',
            result: 'tie',
            damageDealt: 0,
            damageTaken: 0,
            message: 'Player sent out Pikachu!',
          },
        ]}
      />,
    )

    expect(markup).toContain('Player sent out Pikachu!')
    expect(markup).not.toContain('>STANCE DRAW<')
  })

  test('reads turns and entries within each turn from top to bottom', () => {
    const makeLog = (turn: number, message: string): BattleLogEntry => ({
      turn,
      playerStance: 'tech',
      enemyStance: 'tech',
      result: 'tie',
      damageDealt: 0,
      damageTaken: 0,
      message,
    })
    const markup = renderToStaticMarkup(
      <BattleLog
        logs={[
          makeLog(5, 'Newest action.'),
          makeLog(4, 'Fourth turn action.'),
          makeLog(3, 'Second action in turn three.'),
          makeLog(3, 'First action in turn three.'),
          makeLog(2, 'Second turn action.'),
          makeLog(1, 'Old hidden action.'),
        ]}
      />,
    )

    const olderControl = markup.indexOf('Show 1 older turn')
    const turnTwo = markup.indexOf('Turn 2')
    const firstTurnThreeAction = markup.indexOf('First action in turn three.')
    const secondTurnThreeAction = markup.indexOf('Second action in turn three.')
    const turnFour = markup.indexOf('Turn 4')
    const turnFive = markup.indexOf('Turn 5')

    expect(markup).not.toContain('Turn 1')
    expect(olderControl).toBeGreaterThan(-1)
    expect(olderControl).toBeLessThan(turnTwo)
    expect(turnTwo).toBeLessThan(firstTurnThreeAction)
    expect(firstTurnThreeAction).toBeLessThan(secondTurnThreeAction)
    expect(secondTurnThreeAction).toBeLessThan(turnFour)
    expect(turnFour).toBeLessThan(turnFive)
  })

  test('renders doubles exchanges as separate A and B turn sections', () => {
    const markup = renderToStaticMarkup(
      <BattleLog
        logs={[
          {
            turn: 1,
            phase: 'B',
            playerStance: 'power',
            enemyStance: 'tech',
            result: 'win',
            damageDealt: 20,
            damageTaken: 0,
            message: 'Player: Partner uses Attack. [icon:stance:power]',
          },
          {
            turn: 1,
            phase: 'A',
            playerStance: 'speed',
            enemyStance: 'speed',
            result: 'tie',
            damageDealt: 0,
            damageTaken: 0,
            message: 'Player: Lead uses Attack. [icon:stance:speed]',
          },
        ]}
      />,
    )

    expect(markup).toContain('Turn 1 - A')
    expect(markup).toContain('Turn 1 - B')
    expect(markup.indexOf('Turn 1 - A')).toBeLessThan(
      markup.indexOf('Turn 1 - B'),
    )
    expect(markup.match(/STANCE (?:WIN|DRAW)/g)).toHaveLength(2)
  })

  test('renders doubles action targets without changing the singles action vocabulary', () => {
    const markup = renderToStaticMarkup(
      <BattleLog
        logs={[
          {
            turn: 1,
            phase: 'A',
            playerStance: 'power',
            enemyStance: 'tech',
            result: 'win',
            damageDealt: 20,
            damageTaken: 0,
            message:
              'Player: Smeargle uses Heat Wave on Pikachu! [icon:stance:tech] [icon:type:fire]',
          },
          {
            turn: 1,
            phase: 'B',
            playerStance: 'power',
            enemyStance: 'tech',
            result: 'win',
            damageDealt: 20,
            damageTaken: 0,
            message:
              'Player: Skeldirge uses Power Attack on Eevee! [icon:stance:power] [icon:type:fire]',
          },
        ]}
      />,
    )

    expect(markup).toContain('Heat Wave')
    expect(markup).toContain('on Pikachu')
    expect(markup).toContain('attacks')
    expect(markup).toContain('Eevee')
    expect(markup).toContain('>with<')
    expect(markup).not.toContain('against Eevee')
  })
})
