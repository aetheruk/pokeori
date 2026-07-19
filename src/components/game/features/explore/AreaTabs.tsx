import { Check, Lock } from 'lucide-react'
import Image from 'next/image'
import { ResponsivePanel } from '@/components/ui/responsive-panel'
import { subCategories as subCategoryDataMap } from '@/data/sub-region-map'
import { cn } from '@/lib/utils'

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
      <div className="flex-1 overflow-y-auto px-4 pb-4 pt-4">
        <div className="grid grid-cols-2 gap-3">
          {subCategories.map((subCategory) => {
            const status = subCategoryStatuses[subCategory] || 'available'
            const isLocked = status === 'locked'
            const subRegionData = subCategoryDataMap[subCategory]
            return (
              <button
                key={subCategory}
                type="button"
                disabled={isLocked}
                aria-pressed={!isLocked && activeSubCategory === subCategory}
                onClick={() => {
                  if (isLocked) return
                  handleSubCategoryChange(subCategory)
                  setAreaModalOpen(false)
                }}
                className={cn(
                  'game-focus-ring relative w-full overflow-hidden rounded-lg border border-game-border bg-game-surface-raised text-left transition-colors',
                  isLocked
                    ? 'cursor-not-allowed'
                    : 'cursor-pointer hover:border-game-moss/40',
                )}
              >
                <div className="relative aspect-[8/5] w-full">
                  <Image
                    src={subRegionData?.image || '/backgrounds/town.avif'}
                    alt={subCategory}
                    fill
                    sizes="(max-width: 768px) 50vw, 384px"
                    className={cn(
                      'object-cover',
                      isLocked && 'grayscale brightness-50',
                    )}
                  />
                  {isLocked && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="rounded-full border border-game-night-border/60 bg-game-night-surface/80 p-2 backdrop-blur-sm">
                        <Lock className="h-5 w-5 text-game-cream" />
                      </div>
                    </div>
                  )}
                  {!isLocked && activeSubCategory === subCategory && (
                    <div className="absolute top-2 right-2 bg-game-moss rounded-full p-1">
                      <Check className="h-4 w-4 text-game-cream" />
                    </div>
                  )}
                </div>
                <div className="px-3 py-2">
                  <div
                    className={cn(
                      'text-sm font-medium',
                      isLocked ? 'text-game-muted' : 'text-game-ink',
                    )}
                  >
                    {subCategory}
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </ResponsivePanel>
  )
}
