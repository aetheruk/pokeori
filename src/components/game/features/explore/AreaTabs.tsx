import { ScenicChoiceCard } from '@/components/game/shared/ScenicChoiceCard'
import { TaskIconDisplay } from '@/components/game/shared/TaskIconDisplay'
import { ResponsivePanel } from '@/components/ui/responsive-panel'
import { subCategories as subCategoryDataMap } from '@/data/sub-region-map'

interface AreaTabsProps {
  areaModalOpen: boolean
  setAreaModalOpen: (open: boolean) => void
  activeCategory: string
  activeSubCategory: string
  subCategories: string[]
  subCategoryStatuses: Record<
    string,
    'locked' | 'available' | 'in_progress' | 'complete'
  >
  handleSubCategoryChange: (subCategory: string) => void
}

export function AreaTabs({
  areaModalOpen,
  setAreaModalOpen,
  activeCategory,
  activeSubCategory,
  subCategories,
  subCategoryStatuses,
  handleSubCategoryChange,
}: AreaTabsProps) {
  if (!activeCategory || activeCategory === 'Dailies') return null

  return (
    <ResponsivePanel
      open={areaModalOpen}
      onOpenChange={setAreaModalOpen}
      title="Choose an area"
      description="Select a local route or landmark."
      desktopWidth="min(38vw, 520px)"
      mobileHeader={false}
      headerClassName="pr-0 text-center sm:text-center"
      className="flex flex-col bg-game-surface"
    >
      <div className="min-h-0 overflow-y-auto px-4 pb-4 pt-4">
        <div className="space-y-3">
          {subCategories
            .filter(
              (subCategory) =>
                (subCategoryStatuses[subCategory] || 'available') !== 'locked',
            )
            .map((subCategory) => {
              const subRegionData = subCategoryDataMap[subCategory]
              return (
                <ScenicChoiceCard
                  key={subCategory}
                  background={subRegionData?.image || '/backgrounds/town.avif'}
                  title={subCategory}
                  icon={
                    subRegionData?.icon ? (
                      <TaskIconDisplay
                        icon={subRegionData.icon}
                        className="h-10 w-10"
                      />
                    ) : undefined
                  }
                  iconPosition={subRegionData?.icon ? 'left' : 'right'}
                  selected={activeSubCategory === subCategory}
                  onClick={() => {
                    handleSubCategoryChange(subCategory)
                    setAreaModalOpen(false)
                  }}
                />
              )
            })}
        </div>
      </div>
    </ResponsivePanel>
  )
}
