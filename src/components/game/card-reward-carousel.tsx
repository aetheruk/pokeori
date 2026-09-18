'use client'

import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import Image from 'next/image'

export interface CardReward {
  id: string
  name: string
  quantity: number
  rarity?: string
  images?: { small: string; large: string }
  discarded?: boolean
  discardReason?: string
}

interface CardRewardCarouselProps {
  cards: CardReward[]
}

export function CardRewardCarousel({ cards }: CardRewardCarouselProps) {
  if (cards.length === 0) return null

  return (
    <Carousel
      opts={{
        align: 'start',
        loop: true,
      }}
      className="w-full max-w-full"
    >
      <CarouselContent>
        {cards.map((card, index) => (
          <CarouselItem key={`card-${index}`} className="basis-full min-w-0">
            <div
              className={`flex min-h-12 w-full items-center gap-3 border-b border-game-border/75 py-2 ${
                card.discarded ? 'opacity-70' : ''
              }`}
            >
              <div className="relative flex h-8 w-8 shrink-0 items-center justify-center p-0.5">
                <Image
                  src={card.images?.small || '/images/tcg-back.avif'}
                  alt={`${card.name} card`}
                  width={28}
                  height={28}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1 flex items-center justify-between min-w-0 pr-2">
                <div className="flex flex-col min-w-0">
                  <span
                    className={`font-medium text-sm truncate ${
                      card.discarded ? 'text-game-danger line-through' : 'text-game-ink'
                    }`}
                  >
                    {card.name}
                  </span>
                  {card.discarded && (
                    <span className="truncate text-[10px] text-game-danger">{card.discardReason}</span>
                  )}
                </div>
                {!card.discarded && (
                  <span className="text-xs font-bold text-game-muted">{card.rarity}</span>
                )}
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
