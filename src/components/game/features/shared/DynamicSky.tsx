'use client'

import { useState, useEffect, memo, useMemo } from 'react'
import { cn } from '@/lib/utils'
import { getRegionTimeZone, getTimeZoneClockTime } from '@/utilities/requirements'

// Simple Cloud Component
const Clouds = memo(() => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-80 z-0">
    <div className="absolute top-[10%] left-[-20%] w-[40%] h-[20%] bg-white/20 blur-[40px] rounded-full animate-[drift_60s_linear_infinite]" />
    <div
      className="absolute top-[20%] left-[-10%] w-[35%] h-[25%] bg-white/10 blur-[50px] rounded-full animate-[drift_45s_linear_infinite_reverse]"
      style={{ animationDelay: '-10s' }}
    />
    <div
      className="absolute top-[5%] right-[-10%] w-[30%] h-[15%] bg-white/15 blur-[30px] rounded-full animate-[drift_50s_linear_infinite]"
      style={{ animationDelay: '-25s' }}
    />
    <style jsx>{`
      @keyframes drift {
        0% {
          transform: translateX(-10vw);
        }
        50% {
          transform: translateX(5vw);
        }
        100% {
          transform: translateX(-10vw);
        }
      }
    `}</style>
  </div>
))
Clouds.displayName = 'Clouds'

// Twinkling Stars Component
const TwinklingStars = memo(({ starCount = 150 }: { starCount?: number }) => {
  const stars = useMemo(() => {
    return Array.from({ length: starCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2,
    }))
  }, [starCount])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
        .animate-twinkle {
          animation: twinkle ease-in-out infinite;
        }
      `}</style>
    </div>
  )
})
TwinklingStars.displayName = 'TwinklingStars'

interface DynamicSkyProps {
  className?: string
  showAtmosphere?: boolean
  category?: string
}

export const DynamicSky = memo(({ className, showAtmosphere = true, category }: DynamicSkyProps) => {
  const [skyGradient, setSkyGradient] = useState<string>('bg-sky-400') // Default fallback
  const [isNight, setIsNight] = useState<boolean>(false)

  // Determine time-of-day from the authored region/category timezone, not the player's device timezone.
  useEffect(() => {
    const updateSky = () => {
      const { hour } = getTimeZoneClockTime(new Date(), getRegionTimeZone(category))
      let gradient = 'bg-gradient-to-b from-sky-400 to-sky-200' // Default Day
      let night = false

      if (hour >= 5 && hour < 8) {
        // Dawn: Indigo -> Purple -> Orange
        gradient = 'bg-gradient-to-b from-indigo-500 via-purple-500 to-orange-300'
        night = false
      } else if (hour >= 8 && hour < 17) {
        // Day: Bright Sky
        gradient = 'bg-gradient-to-b from-sky-500 to-sky-200'
        night = false
      } else if (hour >= 17 && hour < 20) {
        // Dusk: Dark Indigo -> Purple -> Orange/Red
        gradient = 'bg-gradient-to-b from-indigo-900 via-purple-800 to-orange-500'
        night = false
      } else {
        // Night: Dark Slate/Black
        gradient = 'bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800'
        night = true
      }
      setSkyGradient(gradient)
      setIsNight(night)
    }

    updateSky()
    const intervalId = window.setInterval(updateSky, 30 * 1000)
    return () => window.clearInterval(intervalId)
  }, [category])

  return (
    <div
      className={cn('absolute inset-0 overflow-hidden pointer-events-none', skyGradient, className)}
    >
      {/* Atmosphere Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/10" />

      {/* Dynamic Sky Effects */}
      {showAtmosphere && <>{isNight ? <TwinklingStars starCount={150} /> : <Clouds />}</>}
    </div>
  )
})
DynamicSky.displayName = 'DynamicSky'
