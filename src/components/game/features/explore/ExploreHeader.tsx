import {
  CloudFog,
  CloudHail,
  CloudLightning,
  CloudRain,
  CloudRainWind,
  CloudSnow,
  CloudSun,
  Cloudy,
  MapPin,
  Moon,
  Sun,
  ThermometerSun,
  Wind,
} from 'lucide-react'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import { DesktopSectionEmblem } from '@/components/game/shared/DesktopSectionEmblem'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import type { WeatherType } from '@/data/weather'
import {
  getRegionTimeZone,
  getTimeZoneClockTime,
} from '@/utilities/requirements'
import { resolveSubRegionWeather } from '@/utilities/weather'

interface ExploreHeaderProps {
  currentImage?: string
  currentTitle: string
  currentDescription?: string
  activeCategory: string
  activeSubCategory?: string
  weatherSlot?: number
}

function WeatherIcon({ weather }: { weather: WeatherType }) {
  const className = 'w-4 h-4'
  switch (weather) {
    case 'harsh-sunlight':
      return <Sun className={className} />
    case 'extremely-harsh-sunlight':
      return <ThermometerSun className={className} />
    case 'rain':
      return <CloudRain className={className} />
    case 'heavy-rain':
      return <CloudRainWind className={className} />
    case 'thunderstorm':
      return <CloudLightning className={className} />
    case 'sandstorm':
      return <Wind className={className} />
    case 'hail':
      return <CloudHail className={className} />
    case 'snow':
    case 'snowstorm':
      return <CloudSnow className={className} />
    case 'fog':
      return <CloudFog className={className} />
    case 'strong-winds':
      return <Wind className={className} />
    case 'shadowy-aura':
      return <Cloudy className={className} />
    default:
      return <CloudSun className={className} />
  }
}

export function ExploreHeader({
  currentImage,
  currentTitle,
  currentDescription,
  activeCategory,
  activeSubCategory,
  weatherSlot,
}: ExploreHeaderProps) {
  const [isInfoOpen, setIsInfoOpen] = useState(false)
  const [now, setNow] = useState(() => new Date())

  const isDailies = activeCategory === 'Dailies'
  const clockCategory = activeCategory || currentTitle
  const regionTimeZone = getRegionTimeZone(clockCategory)
  const regionTime = useMemo(
    () => getTimeZoneClockTime(now, regionTimeZone),
    [now, regionTimeZone],
  )
  const isDaytime = regionTime.hour >= 6 && regionTime.hour < 18
  const formattedRegionTime = `${String(regionTime.hour).padStart(2, '0')}:${String(
    regionTime.minute,
  ).padStart(2, '0')}`
  const weather = useMemo(
    () =>
      resolveSubRegionWeather(activeSubCategory || currentTitle, weatherSlot),
    [activeSubCategory, currentTitle, weatherSlot],
  )

  useEffect(() => {
    const intervalId = window.setInterval(() => setNow(new Date()), 30 * 1000)
    return () => window.clearInterval(intervalId)
  }, [])

  return (
    <div className="w-full shrink-0 px-0 md:px-6 md:pt-5">
      <div className="relative h-44 w-full overflow-hidden border-b border-game-border bg-game-surface md:h-56 md:rounded-lg md:border">
        {currentImage ? (
          <Image
            src={currentImage}
            alt={currentTitle || 'Area'}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-game-surface-raised">
            <MapPin className="h-12 w-12 text-game-muted" />
          </div>
        )}

        <div
          className="game-contour-motif absolute inset-0 opacity-20 mix-blend-screen"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#172733]/92 via-[#172733]/26 to-[#172733]/12" />

        <div className="absolute inset-x-0 bottom-0 z-10 p-4 md:p-5">
          <div className="max-w-2xl">
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.15em] text-game-ochre">
              {activeCategory || 'Explore'}
            </p>
            <h1 className="font-display text-2xl font-bold text-game-cream [text-shadow:0_2px_8px_rgb(23_39_51_/_0.9)] md:text-3xl">
              {currentTitle}
            </h1>
            <div className="mt-2 h-px w-16 bg-game-ochre/80" />
            {currentDescription && (
              <p className="mt-2 hidden max-w-2xl truncate text-sm text-game-cream [text-shadow:0_1px_5px_rgb(23_39_51_/_0.95)] md:block">
                {currentDescription}
              </p>
            )}
          </div>
        </div>

        <DesktopSectionEmblem
          section="explore"
          className="absolute bottom-5 right-6 z-10 h-24 w-24 opacity-80 xl:h-28 xl:w-28"
        />

        <div className="absolute top-3 left-3 flex items-center gap-2 z-20">
          {!isDailies && (
            <button
              type="button"
              onClick={() => setIsInfoOpen(true)}
              className="game-focus-ring flex min-h-10 items-center gap-1.5 rounded-md border border-game-night-border/60 bg-game-night-surface/85 px-2.5 py-1.5 text-xs font-medium text-game-cream backdrop-blur-md transition-colors hover:bg-game-night-surface"
              title={isDaytime ? 'Daytime' : 'Nighttime'}
            >
              {isDaytime ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
              <span>{formattedRegionTime}</span>
              <span className="h-3 w-px bg-game-cream/30" />
              <WeatherIcon weather={weather.weather} />
              <span>{weather.label}</span>
            </button>
          )}
        </div>
      </div>

      {/* Info Modal */}
      <Dialog open={isInfoOpen} onOpenChange={setIsInfoOpen}>
        <DialogContent className="rounded-lg border-game-border bg-game-surface text-game-ink sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-xl font-bold text-game-ink">
              {currentTitle}
            </DialogTitle>
          </DialogHeader>
          <div className="py-2">
            <p className="leading-relaxed text-game-muted">
              {currentDescription}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
