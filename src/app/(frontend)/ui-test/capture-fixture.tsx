'use client'

import { useRef, useState } from 'react'
import { CaptureScene } from '@/app/(frontend)/game/locations/encounter/_components/capture-scene'
import { Button } from '@/components/ui/button'
import type { Item } from '@/data/items'

export function CaptureFixture() {
  const target = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)
  const [throws, setThrows] = useState(0)
  return <section aria-label="Capture keyboard fixture" className="h-[700px]">
    <div ref={target}>Capture target</div>
    <p>Keyboard throws: {throws}</p>
    <Button onClick={() => setReady(true)}>Prepare test throw</Button>
    <CaptureScene balls={[{ id: 'poke-ball', name: 'Poké Ball' } as Item]} selectedBallIndex={0} isCapturing={false} showCaptureAnimation={false} ringScale={0.4} aimReady={ready} targetRef={target} inventory={[{ itemId: 'poke-ball', quantity: 2 }]} handleCapture={() => setThrows((value) => value + 1)} nextBall={() => {}} prevBall={() => {}} handleRunAway={() => {}} />
  </section>
}
