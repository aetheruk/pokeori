'use client'

import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { Card } from '@/components/ui/card'
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
            <Card
              className={`h-12 flex-row items-center gap-3 border-game-border bg-game-surface-raised p-2 ${
                card.discarded ? 'opacity-70' : ''
              }`}
            >
              <div className="relative h-8 w-8 shrink-0 rounded-lg bg-game-canvas p-0.5">
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
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
