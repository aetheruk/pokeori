import type { StaticImageData } from 'next/image'
import { ScenicChoiceCard } from '@/components/game/shared/ScenicChoiceCard'
import { TaskIconDisplay } from '@/components/game/shared/TaskIconDisplay'
import { ResponsivePanel } from '@/components/ui/responsive-panel'
import type { TaskIcon } from '@/data/tasks/types'

interface CategoryTabsProps {
  regionModalOpen: boolean
  setRegionModalOpen: (open: boolean) => void
  trainerBackground: string
  trainerIcon: TaskIcon
  regionCategories: Record<
    string,
    {
      image: string | StaticImageData
      description?: string
      icon?: TaskIcon
    }
  >
  categories: string[]
  activeCategory: string
  handleCategoryChange: (category: string) => void
}

export function CategoryTabs({
  regionModalOpen,
  setRegionModalOpen,
  trainerBackground,
  trainerIcon,
  regionCategories,
  categories,
  activeCategory,
  handleCategoryChange,
}: CategoryTabsProps) {
  return (
    <ResponsivePanel
      open={regionModalOpen}
      onOpenChange={setRegionModalOpen}
      title="Choose a region"
      background={trainerBackground}
      icon={
        <TaskIconDisplay
          icon={trainerIcon}
          className="h-20 w-20 text-white md:h-24 md:w-24"
          priority
        />
      }
      desktopWidth="min(38vw, 520px)"
      mobileHeader={false}
      headerClassName="pr-0 text-center sm:text-center"
      className="flex flex-col bg-game-surface"
    >
      <div className="min-h-0 overflow-y-auto px-4 pb-4 pt-4">
        <div className="space-y-3">
          {Object.entries(regionCategories)
            .filter(([regionKey]) => categories.includes(regionKey))
            .map(([regionKey, regionData]) => (
              <ScenicChoiceCard
                key={regionKey}
                background={regionData.image}
                title={regionKey}
                icon={
                  regionData.icon ? (
                    <TaskIconDisplay icon={regionData.icon} className="h-10 w-10" />
                  ) : undefined
                }
                iconPosition={regionData.icon ? 'left' : 'right'}
                selected={activeCategory === regionKey}
                onClick={() => {
                  handleCategoryChange(regionKey)
                  setRegionModalOpen(false)
                }}
              />
            ))}
        </div>
      </div>
    </ResponsivePanel>
  )
}
