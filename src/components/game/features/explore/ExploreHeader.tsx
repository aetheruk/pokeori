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
import type { WeatherType } from '@/data/weather'
import {
  getRegionTimeZone,
  getTimeZoneClockTime,
} from '@/utilities/requirements'
import { resolveSubRegionWeather } from '@/utilities/weather'

interface ExploreHeaderProps {
  currentImage?: string
  currentTitle: string
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
  activeCategory,
  activeSubCategory,
  weatherSlot,
}: ExploreHeaderProps) {
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
            sizes="(min-width: 1280px) 1216px, (min-width: 768px) calc(100vw - 5rem), 100vw"
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

        <div className="absolute inset-x-0 bottom-0 z-10 flex justify-center p-4 text-center md:p-5">
          <div className="max-w-2xl">
            <h1 className="font-display text-2xl font-bold text-game-cream [text-shadow:0_2px_8px_rgb(23_39_51_/_0.9)] md:text-3xl">
              {currentTitle}
            </h1>
            {!isDailies && (
              <div className="mt-2 flex items-center justify-center gap-3 text-sm font-semibold text-game-cream [text-shadow:0_1px_5px_rgb(23_39_51_/_0.95)]">
                <span className="inline-flex items-center gap-1.5">
                  <WeatherIcon weather={weather.weather} />
                  <span>{weather.label}</span>
                </span>
                <span
                  className="h-4 w-px bg-game-cream/60"
                  aria-hidden="true"
                />
                <span className="inline-flex items-center gap-1.5">
                  {isDaytime ? (
                    <Sun className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <Moon className="h-4 w-4" aria-hidden="true" />
                  )}
                  <span>{formattedRegionTime}</span>
                </span>
              </div>
            )}
          </div>
        </div>

        <DesktopSectionEmblem
          section="explore"
          className="absolute bottom-5 right-6 z-10 h-24 w-24 opacity-80 xl:h-28 xl:w-28"
        />

      </div>
    </div>
  )
}
