import { Check, Lock } from 'lucide-react'
import type { StaticImageData } from 'next/image'
import Image from 'next/image'
import { ResponsivePanel } from '@/components/ui/responsive-panel'
import { cn } from '@/lib/utils'

interface CategoryTabsProps {
  regionModalOpen: boolean
  setRegionModalOpen: (open: boolean) => void
  regionCategories: Record<
    string,
    { image: string | StaticImageData; description?: string }
  >
  categories: string[]
  activeCategory: string
  handleCategoryChange: (category: string) => void
}

export function CategoryTabs({
  regionModalOpen,
  setRegionModalOpen,
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
      description="Open a field journal section to explore."
      desktopWidth="min(38vw, 520px)"
      mobileHeader={false}
      className="flex flex-col bg-game-surface"
    >
      <div className="flex-1 overflow-y-auto px-4 pb-4 pt-4">
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(regionCategories).map(([regionKey, regionData]) => {
            const isUnlocked = categories.includes(regionKey)
            return (
              <button
                key={regionKey}
                type="button"
                disabled={!isUnlocked}
                aria-pressed={isUnlocked && activeCategory === regionKey}
                onClick={() => {
                  if (isUnlocked) {
                    handleCategoryChange(regionKey)
                    setRegionModalOpen(false)
                  }
                }}
                className={cn(
                  'game-focus-ring relative w-full overflow-hidden rounded-lg border border-game-border bg-game-surface-raised text-left transition-colors',
                  isUnlocked
                    ? 'cursor-pointer hover:border-game-moss/40'
                    : 'cursor-not-allowed',
                )}
              >
                <div className="relative aspect-[8/5] w-full">
                  <Image
                    src={regionData.image}
                    alt={regionKey}
                    fill
                    className={cn(
                      'object-cover',
                      !isUnlocked && 'grayscale brightness-50',
                    )}
                  />
                  {!isUnlocked && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="rounded-full border border-game-night-border/60 bg-game-night-surface/80 p-2 backdrop-blur-sm">
                        <Lock className="h-5 w-5 text-game-cream" />
                      </div>
                    </div>
                  )}
                  {isUnlocked && activeCategory === regionKey && (
                    <div className="absolute top-2 right-2 bg-game-moss rounded-full p-1">
                      <Check className="h-4 w-4 text-game-cream" />
                    </div>
                  )}
                </div>
                <div
                  className={cn(
                    'px-3 py-2.5 text-sm font-medium',
                    isUnlocked ? 'text-game-ink' : 'text-game-muted',
                  )}
                >
                  {regionKey}
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </ResponsivePanel>
  )
}
