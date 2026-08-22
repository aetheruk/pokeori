import { describe, expect, test } from 'bun:test'
import { readdir } from 'node:fs/promises'
import sharp from 'sharp'
import { battles } from '@/data/battles'
import { expeditions } from '@/data/expeditions'
import { allGames } from '@/data/games'
import {
  chronicleActivityId,
  KANTO_GYM_CHRONICLE_STORIES,
} from '@/data/gym-leader-chronicle-stories'
import { KANTO_GYM_CHRONICLES } from '@/data/gym-leader-chronicles'
import { SPIRIT_CHANNELING_CONFIGS } from '@/data/spirit-channeling'
import { tasks } from '@/data/tasks'
import { banners } from '@/data/user'
import type { ChronicleNarrativePhase } from '@/data/expeditions/types'
import { getMove } from '@/data/moves'
import { getDualTypeEffectiveness } from '@/utilities/battle/type-chart'
import { getPokemonForm } from '@/utilities/pokemon/pokedex'

const expectedRituals = [
  ['badge-kanto-boulder', 'rock', 49, 5],
  ['badge-kanto-cascade', 'water', 86, 10],
  ['badge-kanto-thunder', 'electric', 70, 15],
  ['badge-kanto-rainbow', 'grass', 44, 20],
  ['badge-kanto-soul', 'poison', 34, 25],
  ['badge-kanto-marsh', 'psychic', 64, 30],
  ['badge-kanto-volcano', 'fire', 43, 35],
  ['badge-kanto-earth', 'ground', 91, 40],
] as const

const expectedBannerNames = {
  brock: 'Pewter Hearth',
  misty: 'Cerulean Water Show',
  surge: 'Vermilion Blackout',
  erika: 'Celadon Flower Show',
  koga: 'Fuchsia Courtyard',
  sabrina: 'Quiet Mindscape',
  blaine: 'Cinnabar Quiz Room',
  giovanni: 'Viridian Dining Room',
} as const

const expectedGameTypes = {
  brock: ['mining', 'procedure-order', 'rock-push'],
  misty: ['cry', 'rhythm', 'sliding-puzzle'],
  surge: ['cry', 'magnemite-circuit', 'voltorb-grid'],
  erika: ['identify', 'procedure-order'],
  koga: ['identify', 'rock-tunnel-echo-map', 'silhouette'],
  sabrina: ['rock-tunnel-echo-map', 'silhouette', 'sliding-puzzle'],
  blaine: ['compare', 'procedure-order', 'rock-tunnel-echo-map'],
  giovanni: ['rock-push', 'sliding-puzzle'],
} as const

const phases: ChronicleNarrativePhase[] = [
  'backstory',
  'development',
  'conflict',
  'contemplation',
  'resolution',
  'reflection',
]

describe('Kanto Gym Leader Chronicles gold-tier anthology', () => {
  test('every badge channels with its exact authored energy', () => {
    for (const [badgeId, type, amount, minLevel] of expectedRituals) {
      const config = SPIRIT_CHANNELING_CONFIGS.find(
        (entry) => entry.mementoItemId === badgeId,
      )
      expect(config?.correctIncenseItemId).toBe('incense-memory')
      expect(config?.requiredEnergy).toEqual({ [type]: amount })
      expect(config?.channelerMinLevel).toBe(minLevel)
    }
  })

  test('each Chronicle is a long fixed six-phase route with the authored reward', () => {
    for (const [badgeId] of expectedRituals) {
      const definition = KANTO_GYM_CHRONICLES.find(
        (entry) => entry.badgeItemId === badgeId,
      )!
      const expedition = expeditions.find(
        (entry) => entry.id === definition.expeditionId,
      )!
      const story = KANTO_GYM_CHRONICLE_STORIES[definition.key]
      const scenes = story.sequence.filter((beat) => beat.type === 'scene')
      const panels = scenes.flatMap((entry) => entry.panels)
      const words = panels.reduce(
        (count, panel) => count + panel.message.split(/\s+/).length,
        0,
      )

      expect(expedition.category).toBe('Kanto')
      expect(expedition.subCategory).toBe('Pokemon Tower')
      expect(expedition.canFail).toBe(false)
      expect(expedition.path).toHaveLength(story.sequence.length)
      expect(scenes.length).toBeGreaterThanOrEqual(20)
      expect(panels.length).toBeGreaterThanOrEqual(100)
      expect(words).toBeGreaterThanOrEqual(1100)
      expect([...new Set(story.sequence.map((beat) => beat.phase))]).toEqual(
        phases,
      )
      expect(expedition.rewards).toContainEqual(
        expect.objectContaining({
          type: 'xp',
          skill: 'catching',
          quantity: 3000,
        }),
      )
      expect(expedition.rewards).toContainEqual(
        expect.objectContaining({
          type: 'banner',
          targetId: `chronicle-${definition.key}`,
        }),
      )
      expect(
        expedition.path.every(
          (node) => node.type === 'activity' && node.secret,
        ),
      ).toBe(true)
    }
  })

  test('Chronicle authoring phases and duration targets stay out of the player UI', async () => {
    const source = await Bun.file(
      'src/components/game/features/explore/ExpeditionModal.tsx',
    ).text()

    expect(source).not.toContain('CHRONICLE_PHASES')
    expect(source).not.toContain('Memory folio')
    expect(source).not.toContain('50–60 minutes')
  })

  test('supporting trainer sprites are readable at native UI size', async () => {
    const spriteDirectory = 'public/sprites/trainers/chronicles'
    const spriteFiles = (await readdir(spriteDirectory)).filter((file) =>
      file.endsWith('.avif'),
    )

    expect(spriteFiles).toHaveLength(23)
    for (const spriteFile of spriteFiles) {
      const metadata = await sharp(
        `${spriteDirectory}/${spriteFile}`,
      ).metadata()
      const trimmed = await sharp(`${spriteDirectory}/${spriteFile}`)
        .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .toBuffer({ resolveWithObject: true })

      expect(metadata.width, spriteFile).toBe(80)
      expect(metadata.height, spriteFile).toBe(80)
      expect(metadata.hasAlpha, spriteFile).toBe(true)
      expect(trimmed.info.height, spriteFile).toBeGreaterThanOrEqual(68)
      expect(trimmed.info.width, spriteFile).toBeGreaterThanOrEqual(20)
    }
  })

  test('scene panels render consistent named character portraits and narration mementos', () => {
    for (const definition of KANTO_GYM_CHRONICLES) {
      const speakerIcons = new Map<string, string>()
      for (const scene of KANTO_GYM_CHRONICLE_STORIES[
        definition.key
      ].sequence.filter((beat) => beat.type === 'scene')) {
        const task = tasks.find(
          (entry) => entry.id === chronicleActivityId(definition.key, scene.id),
        )!
        expect(task.enterModal).toHaveLength(scene.panels.length)
        scene.panels.forEach((panel, index) => {
          const rendered = task.enterModal?.[index]
          if (panel.kind === 'narration') {
            expect(rendered?.title).toBe(scene.title)
            expect(rendered?.icon).toEqual({
              type: 'item',
              id:
                panel.icon === 'incense'
                  ? 'incense-memory'
                  : definition.badgeItemId,
            })
            return
          }
          const key = JSON.stringify(panel.speaker.icon)
          expect(speakerIcons.get(panel.speaker.name) ?? key).toBe(key)
          speakerIcons.set(panel.speaker.name, key)
          expect(rendered?.title).toBe(panel.speaker.name)
          expect(rendered?.icon).toEqual(panel.speaker.icon)
        })
      }
    }
  })

  test('all supporting content exists and each battle loadout fits its team cap', () => {
    const gameIds = new Set(allGames.map((entry) => entry.id))
    const battleIds = new Set(battles.map((entry) => entry.id))
    const taskIds = new Set(tasks.map((entry) => entry.id))

    for (const definition of KANTO_GYM_CHRONICLES) {
      const expedition = expeditions.find(
        (entry) => entry.id === definition.expeditionId,
      )!
      const chronicle =
        typeof expedition.chronicle === 'object'
          ? expedition.chronicle
          : undefined
      const gameTypes: string[] = []
      for (const node of expedition.path) {
        if (node.type !== 'activity') continue
        if (node.activityType === 'task')
          expect(taskIds.has(node.activityId!)).toBe(true)
        if (node.activityType === 'battle') {
          const battle = battles.find((entry) => entry.id === node.activityId!)
          const battleTeam =
            chronicle?.activityLoadouts?.[node.activityId!]?.battleTeam
          expect(battleIds.has(node.activityId!)).toBe(true)
          expect(battleTeam?.length).toBeGreaterThan(0)
          expect(battleTeam!.length, node.activityId!).toBeLessThanOrEqual(
            battle?.maxPokemon ?? 6,
          )
        }
        if (node.activityType === 'game') {
          expect(gameIds.has(node.activityId!)).toBe(true)
          gameTypes.push(
            allGames.find((entry) => entry.id === node.activityId)?.gameType ??
              '',
          )
        }
      }
      expect(gameTypes.sort()).toEqual(
        [...expectedGameTypes[definition.key]].sort(),
      )
    }
  })

  test('battles scale in difficulty and use corrected trainer identities', () => {
    const chances = {
      brock: 70,
      misty: 60,
      surge: 55,
      erika: 50,
      koga: 30,
      sabrina: 35,
      blaine: 25,
      giovanni: 20,
    } as const
    for (const definition of KANTO_GYM_CHRONICLES) {
      const entries = battles.filter((entry) =>
        entry.id.startsWith(`chronicle-v2-${definition.key}-`),
      )
      expect(entries.length).toBeGreaterThanOrEqual(2)
      expect(
        entries.every(
          (entry) =>
            entry.enemyAttackTelegraphChance === chances[definition.key],
        ),
      ).toBe(true)
      expect(entries.some((entry) => entry.aiProfile === 'boss')).toBe(true)
    }
    expect(
      battles.find(
        (entry) => entry.id === 'chronicle-v2-erika-exhibition-rival',
      )?.trainerName,
    ).toBe('Celia')
  })

  test('Koga Chronicle battles use the reduced pressure tuning', () => {
    const kogaBattles = battles.filter((entry) =>
      entry.id.startsWith('chronicle-v2-koga-'),
    )

    expect(kogaBattles.map((entry) => entry.enemyAttackTelegraphChance)).toEqual(
      [30, 30, 30],
    )
    expect(
      kogaBattles.map((entry) =>
        entry.enemyTeam.map((pokemon) => pokemon.level),
      ),
    ).toEqual([
      [30, 28],
      [30, 30],
      [33, 34, 35],
    ])
    const tunnelBattle = kogaBattles.find(
      (entry) => entry.id === 'chronicle-v2-koga-tunnel-culprit',
    )!
    expect(tunnelBattle.enemyTeam.map((pokemon) => pokemon.aiMoves)).toEqual([
      ['glare', 'acid', 'poison-sting'],
      ['sludge', 'acid', 'smog'],
    ])
    const koga = KANTO_GYM_CHRONICLES.find((entry) => entry.key === 'koga')!
    const kogaExpedition = expeditions.find(
      (entry) => entry.id === koga.expeditionId,
    )!
    const tunnelLoadout = (
      kogaExpedition.chronicle as any
    ).activityLoadouts['chronicle-v2-koga-tunnel-culprit']
    expect(tunnelLoadout.battleTeam[0].assignedMoves).toContain('psychic')
    expect(tunnelLoadout.battleItems).toEqual({
      'battle-potion': 3,
      'battle-super-potion': 2,
    })
    expect(
      allGames.find(
        (entry) => entry.id === 'chronicle-v2-koga-read-the-shadow-marks',
      )?.settings,
    ).toMatchObject({ winRate: 6 })
  })

  test('the Rainbow Assessment has answers to its counter matchups', () => {
    const battle = battles.find(
      (entry) => entry.id === 'chronicle-v2-erika-league-steward',
    )!
    const erikaDefinition = KANTO_GYM_CHRONICLES.find(
      (entry) => entry.key === 'erika',
    )!
    const expedition = expeditions.find(
      (entry) => entry.id === erikaDefinition.expeditionId,
    )!
    const chronicle =
      typeof expedition.chronicle === 'object' ? expedition.chronicle : undefined
    const playerTeam =
      chronicle?.activityLoadouts?.[battle.id]?.battleTeam ?? []

    expect(playerTeam).toHaveLength(4)
    expect(battle.maxPokemon).toBe(playerTeam.length)
    expect(battle.enemyTeam.map((pokemon) => pokemon.speciesId)).toEqual([
      53, 76, 65,
    ])

    const playerMatchups = playerTeam.map((pokemon) => ({
      types: getPokemonForm(pokemon.formId ?? String(pokemon.speciesId))!.types,
      moves: (pokemon.assignedMoves ?? [])
        .map((moveId) => getMove(moveId))
        .filter((move) => move && move.damage > 0),
    }))
    const enemyMatchups = battle.enemyTeam.map((pokemon) => ({
      types: getPokemonForm(pokemon.formId ?? String(pokemon.speciesId))!.types,
      moves: (pokemon.aiMoves ?? [])
        .map((moveId) => getMove(moveId))
        .filter((move) => move && move.damage > 0),
    }))

    const universalHardCounters = enemyMatchups.filter((enemy) =>
      enemy.moves.some((move) =>
        playerMatchups.every(
          (player) =>
            getDualTypeEffectiveness(move!.forcedType ?? 'normal', player.types) > 1,
        ),
      ),
    )
    expect(universalHardCounters).toHaveLength(0)

    for (const enemy of enemyMatchups) {
      expect(
        playerMatchups.filter((player) =>
          player.moves.some(
            (move) =>
              getDualTypeEffectiveness(move!.forcedType ?? 'normal', enemy.types) >= 1,
          ),
        ).length,
      ).toBeGreaterThanOrEqual(2)
    }
  })

  test('every Chronicle has its short-form player banner definition', () => {
    for (const definition of KANTO_GYM_CHRONICLES) {
      const banner = banners.find(
        (entry) => entry.id === `chronicle-${definition.key}`,
      )
      expect(banner?.imagePath).toBe(definition.background)
      expect(banner?.name).toBe(expectedBannerNames[definition.key])
    }
  })

  test('signature narrative outcomes remain authored', () => {
    const misty = JSON.stringify(KANTO_GYM_CHRONICLE_STORIES.misty)
    const erika = JSON.stringify(KANTO_GYM_CHRONICLE_STORIES.erika)
    const blaine = JSON.stringify(KANTO_GYM_CHRONICLE_STORIES.blaine)
    expect(misty).toContain('Two Honest Posters')
    expect(misty.toLowerCase()).not.toContain('pump')
    expect(erika).toContain('She had become a Leader. She had not become free.')
    expect(blaine).toContain('Nami did not')
  })

  test('anthology prose avoids future-world leaks and em dashes', () => {
    const authored = JSON.stringify({
      stories: KANTO_GYM_CHRONICLE_STORIES,
    }).toLowerCase()
    expect(authored).not.toContain('—')
    for (const forbidden of [
      'shadow pokemon',
      'rift',
      'mewtwo',
      'team rainbow rocket',
    ]) {
      expect(authored).not.toContain(forbidden)
    }
  })
})
