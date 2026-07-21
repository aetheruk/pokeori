import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { ItemSprite } from '@/components/ui/item-sprite'
import { PokemonRaritySprite } from '@/components/game/shared/PokemonRaritySprite'
import type { PokemonRarityId } from '@/utilities/pokemon/rarity-effects'

interface PokemonDisplayProps {
  formId: string
  isPlayer?: boolean
  isAttacking?: boolean
  isHit?: boolean
  isFainting?: boolean
  isSwitchingOut?: boolean
  isSwitchingIn?: boolean
  backSprite?: boolean
  usePixelSprite?: boolean
  isDynamaxed?: boolean
  hasTeraEffect?: boolean
  hasZPowerEffect?: boolean
  teraType?: string
  status?: { id: string; counter: number }
  isShadow?: boolean
  isRadiant?: boolean
  shiny?: boolean
  rarity?: PokemonRarityId | null
  gender?: string | null
  damageSplat?: number | null
  statusDamageSplat?: number | null
  attackEffectType?: string | null
  className?: string
}

const ATTACK_EFFECT_TYPES = new Set([
  'normal',
  'fire',
  'water',
  'electric',
  'grass',
  'ice',
  'fighting',
  'poison',
  'ground',
  'flying',
  'psychic',
  'bug',
  'rock',
  'ghost',
  'dragon',
  'dark',
  'steel',
  'fairy',
])

function getAttackEffectType(type?: string | null) {
  const normalized = type?.trim().toLowerCase()
  if (!normalized) return null
  return ATTACK_EFFECT_TYPES.has(normalized) ? normalized : 'normal'
}

export function PokemonDisplay({
  formId,
  isPlayer,
  isAttacking,
  isHit,
  isFainting,
  isSwitchingOut,
  isSwitchingIn,
  backSprite,
  usePixelSprite,
  isDynamaxed,
  hasTeraEffect,
  hasZPowerEffect,
  teraType,
  status,
  isShadow,
  isRadiant,
  shiny,
  rarity,
  gender,
  damageSplat,
  statusDamageSplat,
  attackEffectType,
  className,
}: PokemonDisplayProps) {
  const getTeraShardItemId = (type: string) => {
    return `tera-shard-${type.toLowerCase()}`
  }

  return (
    <div
      className={cn(
        'relative w-16 h-16 transition-all duration-300',
        className,
        isDynamaxed && 'scale-150', // Dynamaxed Pokemon are 50% larger
        isAttacking &&
          (isPlayer ? 'translate-x-12 -translate-y-12' : '-translate-x-12 translate-y-12'),
        isHit && 'animate-shake opacity-80 grayscale-[0.5]',
        isFainting && 'translate-y-20 opacity-0 grayscale transition-all duration-1000 ease-in',
        isSwitchingOut &&
          (isPlayer
            ? '-translate-x-16 translate-y-8 scale-75 opacity-0'
            : 'translate-x-16 -translate-y-8 scale-75 opacity-0'),
        isSwitchingIn &&
          (isPlayer
            ? '-translate-x-16 translate-y-8 scale-75 opacity-0'
            : 'translate-x-16 -translate-y-8 scale-75 opacity-0'),
        status?.id === 'vanished' && 'opacity-0',
      )}
    >
      {/* Z Power glowing aura */}
      {hasZPowerEffect && (
        <div className="absolute inset-0 rounded-full bg-game-ochre/20 animate-ping" />
      )}

      <PokemonRaritySprite
        key={formId} // Force re-render when formId changes
        formId={formId}
        view={backSprite ? 'back' : usePixelSprite ? 'front' : 'home'}
        rarity={rarity}
        shiny={shiny}
        isShadow={isShadow}
        isRadiant={isRadiant}
        female={gender === 'female'}
        alt="Pokemon"
        className="absolute inset-0"
        imageClassName="drop-shadow-xl"
      />

      <TypeAttackEffect type={attackEffectType} />

      {/* Tera pulsing crystal */}
      {hasTeraEffect && teraType && (
        <div className="absolute -top-2 -right-2 w-8 h-8 animate-pulse">
          <ItemSprite
            itemId={getTeraShardItemId(teraType!)}
            alt={`${teraType} Tera Crystal`}
            width={32}
            height={32}
            className="w-full h-full object-contain drop-shadow-lg"
          />
        </div>
      )}

      {/* Floating Damage Splats */}
      {/* Combat Damage (Center) */}
      <DamageSplat damage={damageSplat} />

      {/* Status Damage (Offset slightly to right/up to avoid overlap) */}
      <DamageSplat
        damage={statusDamageSplat}
        statusId={status?.id}
        isStatusDamage={true}
        className="-translate-y-[80%] translate-x-[20%]"
      />
    </div>
  )
}

function TypeAttackEffect({ type }: { type?: string | null }) {
  const effectType = getAttackEffectType(type)
  if (!effectType) return null

  return (
    <div
      key={effectType}
      className={cn('battle-type-effect', `battle-type-effect--${effectType}`)}
      aria-hidden="true"
    >
      <span />
      <span />
      <span />
      <span />
      <span />
      <span />
    </div>
  )
}

function DamageSplat({
  damage,
  statusId,
  isStatusDamage,
  className,
}: {
  damage?: number | null
  statusId?: string
  isStatusDamage?: boolean
  className?: string
}) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (damage) {
      setVisible(true)
      const timer = setTimeout(() => setVisible(false), 1200)
      return () => clearTimeout(timer)
    }
  }, [damage])

  if (!visible || !damage) return null

  // Status-based colors
  const statusColors: Record<string, { glow: string; text: string; shadow: string }> = {
    poison: { glow: 'bg-game-clay-strong', text: 'text-game-clay-strong', shadow: 'rgba(184,97,72,0.8)' },
    'bad-poison': {
      glow: 'bg-game-danger',
      text: 'text-game-danger',
      shadow: 'rgba(189,90,71,0.8)',
    },
    burn: { glow: 'bg-game-clay', text: 'text-game-clay', shadow: 'rgba(184,97,72,0.8)' },
    frostbite: { glow: 'bg-game-moss-strong', text: 'text-game-moss-strong', shadow: 'rgba(95,121,79,0.8)' },
  }

  // Use status color if available AND isStatusDamage is true
  const statusColor = statusId && isStatusDamage ? statusColors[statusId] : null

  // Fallback damage-based colors
  const isHighDamage = damage >= 100
  const isCritical = damage >= 200

  const glowClass =
    statusColor?.glow ||
    (isCritical ? 'bg-game-danger' : isHighDamage ? 'bg-game-clay' : 'bg-game-ochre')
  const textClass =
    statusColor?.text ||
    (isCritical ? 'text-game-danger' : isHighDamage ? 'text-game-clay' : 'text-game-ochre')
  const shadowColor =
    statusColor?.shadow ||
    (isCritical
      ? 'rgba(189,90,71,0.8)'
      : isHighDamage
        ? 'rgba(184,97,72,0.8)'
        : 'rgba(181,138,67,0.6)')

  return (
    <div
      className={cn(
        'absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none',
        className,
      )}
    >
      <div className="relative animate-float-damage">
        {/* Glow effect */}
        <div
          className={`absolute inset-0 blur-md rounded-full ${glowClass} opacity-60`}
          style={{ transform: 'scale(1.5)' }}
        />
        {/* Main number */}
        <span
          className={`relative text-4xl font-black ${textClass}`}
          style={{
            WebkitTextStroke: '2px rgba(0,0,0,0.8)',
            textShadow: `
              0 0 10px ${shadowColor},
              0 0 20px ${shadowColor.replace('0.8', '0.5')},
              0 2px 4px rgba(0,0,0,0.9)
            `,
          }}
        >
          {damage}
        </span>
      </div>
    </div>
  )
}
