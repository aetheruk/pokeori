import { SectionDivider } from '@/components/ui/section-divider'
import { ExploreCard } from './ExploreCard'
import type { ExploreDisplayItem, ExploreItem, ExploreItemGroup } from './types'
import type { RequirementData } from '@/utilities/requirements'
import { memo, useMemo } from 'react'

interface ExploreGridProps {
  filteredItems: ExploreItem[]
  randomEvent?: ExploreItem | null
  vsSeekerEvent?: ExploreItem | null
  activeCategory: string
  activeVoyages: { voyageId: string; endTime: string }[]
  activeExpedition: any | null
  trainerName: string
  userData: RequirementData
  onAction: (item: ExploreItem) => void
  playSelectSfx: () => void
  setActiveShop: (shop: any) => void
  setSelectedItem: (item: ExploreItem) => void
}

function ExploreGridComponent({
  filteredItems,
  randomEvent,
  vsSeekerEvent,
  activeCategory,
  activeVoyages,
  activeExpedition,
  trainerName,
  userData,
  onAction,
  playSelectSfx,
  setActiveShop,
  setSelectedItem,
}: ExploreGridProps) {
  if (filteredItems.length === 0 && !randomEvent && !vsSeekerEvent) {
    return (
      <div
        className="mx-auto max-w-xl rounded-lg border border-dashed border-game-border-strong bg-game-canvas/60 px-4 py-10 text-center text-sm font-medium text-game-muted"
        role="status"
        aria-live="polite"
      >
        Nothing found in this area.
      </div>
    )
  }

  const typeDisplayNames = useMemo<Record<string, string>>(
    () => ({
      challenge: 'Challenges',
      chat: 'Conversations',
      location: 'Locations',
      battle: 'Trainer Battles',
      research: 'Mini Games',
      shop: 'Shops',
      voyage: 'Voyages',
      expedition: 'Expeditions',
      chronicle: 'Chronicles',
      task: activeCategory === 'Dailies' ? 'Daily Tasks' : 'Tasks',
    }),
    [activeCategory],
  )

  const groupedSections = useMemo(() => {
    const order: string[] = [
      'challenge',
      'chat',
      'task',
      'location',
      'battle',
      'research',
      'shop',
      'voyage',
      'chronicle',
      'expedition',
    ]

    const groups: Record<string, ExploreItem[]> = {}
    filteredItems.forEach((item) => {
      // Group route-style research games under locations instead of research
      let groupType = item.type as string
      if (
        item.type === 'research' &&
        ((item.originalData as any).gameType === 'fishing' ||
          (item.originalData as any).gameType === 'field-observation')
      ) {
        groupType = 'location'
      }
      // Group wild battles under locations
      if (item.type === 'battle' && (item.originalData as any).isWildBattle) {
        groupType = 'location'
      }
      if (item.type === 'task' && item.isChallenge) {
        groupType = 'challenge'
      }
      if (
        item.type === 'task' &&
        (item.originalData as any).chat &&
        !item.isChallenge
      ) {
        groupType = 'chat'
      }
      if (item.type === 'expedition' && (item.originalData as any).chronicle) {
        groupType = 'chronicle'
      }
      if (!groups[groupType]) groups[groupType] = []
      groups[groupType]!.push(item)
    })

    const getDisplayItems = (
      type: string,
      items: ExploreItem[],
    ): ExploreDisplayItem[] => {
      if (type !== 'location' && type !== 'research') {
        return items.map((item) => ({ kind: 'single', item }))
      }

      if (type === 'research') {
        const isGroupableResearchMode = (item: ExploreItem) =>
          item.type === 'research' &&
          (item.originalData as any).gameType !== 'fishing' &&
          (item.originalData as any).gameType !== 'field-observation'

        const getResearchBaseName = (name: string) => name.replace(/\s+EX$/i, '')
        const isExResearch = (item: ExploreItem) => /\s+EX$/i.test(item.name)

        const displayItems: ExploreDisplayItem[] = []
        const handledIds = new Set<string>()
        const groupableItems = items.filter(isGroupableResearchMode)

        items.forEach((item) => {
          if (handledIds.has(item.id)) return

          if (!isGroupableResearchMode(item)) {
            displayItems.push({ kind: 'single', item })
            handledIds.add(item.id)
            return
          }

          const baseName = getResearchBaseName(item.name)
          const gameType = (item.originalData as any).gameType
          const matchingItems = groupableItems.filter(
            (candidate) =>
              getResearchBaseName(candidate.name) === baseName &&
              candidate.category === item.category &&
              (candidate.subCategory || 'unassigned') ===
                (item.subCategory || 'unassigned') &&
              (candidate.originalData as any).gameType === gameType,
          )
          const hasNormal = matchingItems.some(
            (candidate) => !isExResearch(candidate),
          )
          const hasEx = matchingItems.some(isExResearch)

          if (matchingItems.length > 1 && hasNormal && hasEx) {
            matchingItems.forEach((candidate) => handledIds.add(candidate.id))
            const sortedModes = [...matchingItems].sort((a, b) => {
              const rank = (mode: ExploreItem) => (isExResearch(mode) ? 1 : 0)
              return rank(a) - rank(b) || a.name.localeCompare(b.name)
            })
            const primary = sortedModes[0]!
            const group: ExploreItemGroup = {
              id: `group:${primary.category}:${primary.subCategory || 'unassigned'}:${gameType}:${baseName}`,
              name: baseName,
              category: primary.category,
              subCategory: primary.subCategory,
              icon: primary.icon,
              items: sortedModes,
            }
            displayItems.push({ kind: 'group', group })
          } else {
            displayItems.push({ kind: 'single', item })
            handledIds.add(item.id)
          }
        })

        return displayItems
      }

      const isGroupableLocationMode = (item: ExploreItem) =>
        item.type === 'location' ||
        (item.type === 'battle' && (item.originalData as any).isWildBattle) ||
        (item.type === 'research' &&
          ((item.originalData as any).gameType === 'fishing' ||
            (item.originalData as any).gameType === 'field-observation'))

      const displayItems: ExploreDisplayItem[] = []
      const handledIds = new Set<string>()
      const groupableItems = items.filter(isGroupableLocationMode)

      items.forEach((item) => {
        if (handledIds.has(item.id)) return

        if (!isGroupableLocationMode(item)) {
          displayItems.push({ kind: 'single', item })
          handledIds.add(item.id)
          return
        }

        const matchingItems = groupableItems.filter(
          (candidate) =>
            candidate.name === item.name &&
            candidate.category === item.category &&
            (candidate.subCategory || 'unassigned') ===
              (item.subCategory || 'unassigned'),
        )
        const hasLocation = matchingItems.some(
          (candidate) => candidate.type === 'location',
        )
        const hasWildBattle = matchingItems.some(
          (candidate) =>
            candidate.type === 'battle' &&
            (candidate.originalData as any).isWildBattle,
        )
        const hasFishing = matchingItems.some(
          (candidate) =>
            candidate.type === 'research' &&
            (candidate.originalData as any).gameType === 'fishing',
        )
        const hasStudy = matchingItems.some(
          (candidate) =>
            candidate.type === 'research' &&
            (candidate.originalData as any).gameType === 'field-observation',
        )

        if (
          matchingItems.length > 1 &&
          (hasLocation || hasWildBattle || hasFishing || hasStudy)
        ) {
          matchingItems.forEach((candidate) => handledIds.add(candidate.id))
          const sortedModes = [...matchingItems].sort((a, b) => {
            const rank = (mode: ExploreItem) => {
              if (mode.type === 'location') return 0
              if (mode.type === 'battle') return 1
              if ((mode.originalData as any).gameType === 'field-observation')
                return 2
              return 3
            }
            return rank(a) - rank(b) || a.name.localeCompare(b.name)
          })
          const primary = sortedModes[0]!
          const group: ExploreItemGroup = {
            id: `group:${primary.category}:${primary.subCategory || 'unassigned'}:${primary.name}`,
            name: primary.name,
            category: primary.category,
            subCategory: primary.subCategory,
            icon: primary.icon,
            items: sortedModes,
          }
          displayItems.push({ kind: 'group', group })
        } else {
          displayItems.push({ kind: 'single', item })
          handledIds.add(item.id)
        }
      })

      return displayItems
    }

    const getDisplayName = (entry: ExploreDisplayItem) =>
      entry.kind === 'group' ? entry.group.name : entry.item.name

    return order.flatMap((type) => {
      const items = groups[type]
      if (!items || items.length === 0) return []

      const sortedItems = getDisplayItems(type, items).sort((a, b) =>
        getDisplayName(a).localeCompare(getDisplayName(b)),
      )

      return [{ type, items: sortedItems }]
    })
  }, [filteredItems])

  return (
    <div className="space-y-8">
      {vsSeekerEvent && (
        <div>
          <SectionDivider textColor="text-game-ochre">VS Seeker</SectionDivider>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            <ExploreCard
              key={vsSeekerEvent.id}
              entry={{ kind: 'single', item: vsSeekerEvent }}
              trainerName={trainerName}
              userData={userData}
              activeVoyages={activeVoyages}
              activeExpedition={activeExpedition}
              onAction={onAction}
              playSelectSfx={playSelectSfx}
              setActiveShop={setActiveShop}
              setSelectedItem={setSelectedItem}
            />
          </div>
        </div>
      )}
      {randomEvent && (
        <div>
          <SectionDivider textColor="text-game-ochre">
            Random Event
          </SectionDivider>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            <ExploreCard
              key={randomEvent.id}
              entry={{ kind: 'single', item: randomEvent }}
              trainerName={trainerName}
              userData={userData}
              activeVoyages={activeVoyages}
              activeExpedition={activeExpedition}
              onAction={onAction}
              playSelectSfx={playSelectSfx}
              setActiveShop={setActiveShop}
              setSelectedItem={setSelectedItem}
            />
          </div>
        </div>
      )}
      {groupedSections.map(({ type, items }) => {
        return (
          <div key={type}>
            <SectionDivider textColor="text-game-moss-strong">
              {typeDisplayNames[type]}
            </SectionDivider>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {items.map((entry) => (
                <ExploreCard
                  key={entry.kind === 'group' ? entry.group.id : entry.item.id}
                  entry={entry}
                  trainerName={trainerName}
                  userData={userData}
                  activeVoyages={activeVoyages}
                  activeExpedition={activeExpedition}
                  onAction={onAction}
                  playSelectSfx={playSelectSfx}
                  setActiveShop={setActiveShop}
                  setSelectedItem={setSelectedItem}
                />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export const ExploreGrid = memo(
  ExploreGridComponent,
  (prev, next) =>
    prev.filteredItems === next.filteredItems &&
    prev.randomEvent === next.randomEvent &&
    prev.vsSeekerEvent === next.vsSeekerEvent &&
    prev.activeCategory === next.activeCategory &&
    prev.activeVoyages === next.activeVoyages &&
    prev.activeExpedition === next.activeExpedition &&
    prev.trainerName === next.trainerName &&
    prev.userData === next.userData,
)
