'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/context/UserContext'
import { useAudio } from '@/context/AudioContext'
import { useGameMusic } from '@/hooks/useGameMusic'
import { useGridActivityReturn } from '@/components/game/shared/GridActivityReturnContext'
import { RewardResultOverlay } from '@/components/game/shared/RewardResultOverlay'
import { CurrencySprite } from '@/components/ui/currency-sprite'
import { getItemSpriteUrl } from '@/data/items'
import type { CoinPusherGameConfig } from '@/data/games/coin-pusher/types'
import type { CoinPusherBoard, CoinPusherBody } from '@/utilities/research/coin-pusher-simulation'
import { COIN_PUSHER_DEPTH, COIN_PUSHER_WIDTH } from '@/utilities/research/coin-pusher-simulation'
import { completeGame } from '@/utilities/games/client-action-recovery'
import { advanceCoinPusherGame } from '../games/coin-pusher'

type Session = { board: CoinPusherBoard; totalCost: number; totalRewards: any }
type Request = { encounterId: string; revision: number; actionId: string; drops: number[] }

function point(body: Pick<CoinPusherBody, 'x' | 'y' | 'shelf'>) {
  const depth = Math.max(0, Math.min(1, body.y / COIN_PUSHER_DEPTH))
  const scale = 0.82 + depth * 0.18
  return { x: 180 + (body.x - COIN_PUSHER_WIDTH / 2) * scale, y: (body.shelf === 0 ? 105 : 270) + depth * 103, scale }
}

function drawMachine(ctx: CanvasRenderingContext2D, board: CoinPusherBoard, previous: CoinPusherBoard | null, progress: number, sprites: Map<string, HTMLImageElement>, aim: number) {
  ctx.clearRect(0, 0, 360, 460)
  ctx.fillStyle = '#152d35'
  ctx.beginPath(); ctx.roundRect(7, 10, 346, 440, 24); ctx.fill()
  ctx.fillStyle = '#334f52'
  ctx.beginPath(); ctx.roundRect(15, 18, 330, 424, 18); ctx.fill()
  ctx.fillStyle = '#72e5d0'
  ctx.beginPath(); ctx.roundRect(25, 28, 310, 28, 8); ctx.fill()
  ctx.fillStyle = '#173d41'; ctx.font = 'bold 14px sans-serif'; ctx.textAlign = 'center'
  ctx.fillText('COIN PUSHER', 180, 47)
  const surface = (top: number) => {
    ctx.fillStyle = '#172a2f'
    ctx.beginPath(); ctx.moveTo(38, top); ctx.lineTo(322, top); ctx.lineTo(340, top + 110); ctx.lineTo(20, top + 110); ctx.closePath(); ctx.fill()
    ctx.fillStyle = '#a8cebd'
    ctx.beginPath(); ctx.moveTo(49, top + 9); ctx.lineTo(311, top + 9); ctx.lineTo(328, top + 99); ctx.lineTo(32, top + 99); ctx.closePath(); ctx.fill()
    ctx.fillStyle = '#658d83'; ctx.fillRect(23, top + 105, 314, 13)
    ctx.fillStyle = '#233e40'; ctx.fillRect(23, top + 118, 314, 10)
  }
  surface(96); surface(261)
  const tick = (previous?.tick || board.tick) + (board.tick - (previous?.tick || board.tick)) * progress
  for (const shelf of [0, 1] as const) {
    const y = 20 + (1 - Math.cos(tick / 90 * Math.PI * 2 + shelf * Math.PI / 2)) * 15
    const p = point({ x: 160, y, shelf })
    ctx.fillStyle = '#42766e'; ctx.fillRect(49, p.y - 8, 262, 11)
    ctx.fillStyle = '#99ddd0'; ctx.fillRect(49, p.y - 10, 262, 4)
  }
  const previousById = new Map(previous?.bodies.map((body) => [body.id, body]) || [])
  const bodies = [...board.bodies].sort((a, b) => a.shelf - b.shelf || a.y - b.y)
  for (const body of bodies) {
    const old = previousById.get(body.id)
    const sameShelf = old && old.shelf === body.shelf
    const p = point({ ...body, x: sameShelf ? old.x + (body.x - old.x) * progress : body.x, y: sameShelf ? old.y + (body.y - old.y) * progress : body.y })
    const radius = (body.kind === 'coin' ? 11 : 15) * p.scale
    ctx.save(); ctx.translate(p.x, p.y); ctx.scale(1, .55)
    if (body.kind === 'coin') {
      ctx.fillStyle = '#815619'; ctx.beginPath(); ctx.arc(0, 3, radius, 0, Math.PI * 2); ctx.fill()
      ctx.fillStyle = '#ffd66b'; ctx.beginPath(); ctx.arc(0, 0, radius, 0, Math.PI * 2); ctx.fill()
      ctx.strokeStyle = '#d19c32'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(0, 0, radius * .68, 0, Math.PI * 2); ctx.stroke()
    } else {
      ctx.scale(1, 1.65); ctx.fillStyle = 'rgba(141, 239, 235, .8)'; ctx.beginPath(); ctx.arc(0, 0, radius, 0, Math.PI * 2); ctx.fill()
      ctx.strokeStyle = '#e9ffff'; ctx.lineWidth = 2; ctx.stroke()
      const image = body.prizeId ? sprites.get(body.prizeId) : undefined
      if (image?.complete && image.naturalWidth) ctx.drawImage(image, -radius * .7, -radius * .7, radius * 1.4, radius * 1.4)
      ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(-radius * .38, -radius * .4, 2.4, 0, Math.PI * 2); ctx.fill()
    }
    ctx.restore()
  }
  ctx.fillStyle = '#0d2227'; ctx.beginPath(); ctx.roundRect(83, 408, 194, 26, 8); ctx.fill()
  ctx.fillStyle = '#6edcc9'; ctx.fillRect(103, 410, 154, 3)
  ctx.fillStyle = '#ffe18e'; ctx.beginPath(); ctx.moveTo(40 + aim * 280, 66); ctx.lineTo(33 + aim * 280, 57); ctx.lineTo(47 + aim * 280, 57); ctx.closePath(); ctx.fill()
}

export function CoinPusherGame({ encounter, state }: { encounter: CoinPusherGameConfig; state?: any }) {
  useGameMusic(encounter)
  const router = useRouter()
  const gridReturn = useGridActivityReturn()
  const { user, refreshUser } = useUser()
  const { playSfx } = useAudio()
  const initial = state?.coinPusherSession as Session | undefined
  const [session, setSession] = useState<Session | undefined>(initial)
  const sessionRef = useRef(initial)
  const [aim, setAim] = useState(.5)
  const aimRef = useRef(aim)
  const [message, setMessage] = useState('')
  const [pending, setPending] = useState(0)
  const [result, setResult] = useState<any>(null)
  const [closing, setClosing] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sprites = useRef(new Map<string, HTMLImageElement>())
  const transition = useRef<{ from: CoinPusherBoard | null; started: number }>({ from: null, started: 0 })
  const queue = useRef<number[]>([])
  const busy = useRef(false)
  const failed = useRef(false)
  const requestRef = useRef<Request | null>(null)
  const storageKey = `coin-pusher:${encounter.id}:${state?.startTime}`

  useEffect(() => {
    for (const prize of encounter.settings.prizePool) {
      if (prize.icon.type !== 'item') continue
      const image = new Image(); image.src = getItemSpriteUrl(prize.icon.id)
      sprites.current.set(prize.id, image)
    }
    try { requestRef.current = JSON.parse(sessionStorage.getItem(storageKey) || 'null') } catch { requestRef.current = null }
  }, [encounter.settings.prizePool, storageKey])

  useEffect(() => {
    let frame = 0
    const draw = () => {
      const context = canvasRef.current?.getContext('2d')
      const board = sessionRef.current?.board
      if (context && board) {
        const progress = Math.min(1, (performance.now() - transition.current.started) / 1400)
        drawMachine(context, board, transition.current.from, progress, sprites.current, aimRef.current)
      }
      frame = requestAnimationFrame(draw)
    }
    frame = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(frame)
  }, [])

  const flush = useCallback(async () => {
    if (busy.current || failed.current || !sessionRef.current) return false
    busy.current = true
    const oldRequest = requestRef.current
    const drops = oldRequest ? oldRequest.drops : queue.current.splice(0, 3)
    setPending(queue.current.length + drops.length)
    const request = oldRequest || { encounterId: encounter.id, revision: sessionRef.current.board.revision, actionId: crypto.randomUUID(), drops }
    if (!drops.length && !requestRef.current && request.revision === 0) { busy.current = false; return true }
    requestRef.current = request
    try {
      try { sessionStorage.setItem(storageKey, JSON.stringify(request)) } catch { /* The server receipt still protects retries. */ }
      const response = await advanceCoinPusherGame(request)
      if (!response.success) {
        if (response.error === 'Not enough currency to drop a coin.') {
          requestRef.current = null; try { sessionStorage.removeItem(storageKey) } catch {} setPending(queue.current.length); setMessage(response.error)
          return false
        }
        failed.current = true; setMessage(response.error); return false
      }
      transition.current = { from: sessionRef.current.board, started: performance.now() }
      sessionRef.current = response.session
      setSession(response.session)
      if (response.replayed) queue.current.unshift(...drops)
      requestRef.current = null
      try { sessionStorage.removeItem(storageKey) } catch {}
      setPending(queue.current.length)
      if (response.rewards) { setMessage('Prize collected!'); playSfx('good'); void refreshUser() }
      else if (drops.length) { setMessage(''); void refreshUser() }
      return true
    } catch {
      failed.current = true; setMessage('Connection interrupted. Tap retry to continue.')
      return false
    } finally { busy.current = false }
  }, [encounter.id, playSfx, refreshUser, storageKey])

  useEffect(() => {
    void flush()
    const timer = window.setInterval(() => { if (!closing && !result) void flush() }, 1500)
    return () => window.clearInterval(timer)
  }, [flush, closing, result])

  const drop = (position: number) => {
    const available = (user?.currency as any)?.[encounter.settings.cost.currencyType] || 0
    const outstanding = queue.current.length + (requestRef.current?.drops.length || 0)
    if (available < encounter.settings.cost.amount * (outstanding + 1)) { setMessage('Not enough currency to drop a coin.'); return }
    if (queue.current.length >= 12 || closing || result) return
    playSfx('select')
    queue.current.push(position); setPending(outstanding + 1); void flush()
  }
  const leave = async () => {
    setClosing(true)
    if (busy.current || requestRef.current || queue.current.length) { setClosing(false); setMessage('Please wait for your coins to settle.'); return }
    const res = await completeGame(encounter.id, true)
    if (!res.success) { setMessage(res.error || 'Could not leave the machine.'); setClosing(false); return }
    setResult({ success: res.success, activitySuccess: res.activitySuccess, message: res.success ? 'Session ended' : res.error, rewards: res.summary })
    setClosing(false)
  }
  if (!session) return <div className="p-8 text-center">This machine could not be loaded.</div>
  return (
    <main className="relative flex min-h-dvh flex-col items-center overflow-hidden bg-[#18343a] px-4 pb-8 pt-[max(1rem,env(safe-area-inset-top))] text-white">
      <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url(${encounter.background})` }} />
      <header className="relative flex w-full max-w-md items-center justify-between gap-4">
        <div className="flex items-center gap-2 rounded-full bg-[#10282e]/90 px-3 py-2 font-bold"><CurrencySprite currencyId={encounter.settings.cost.currencyType} width={24} height={24} /><span>{(user?.currency as any)?.[encounter.settings.cost.currencyType] || 0}</span></div>
        <button onClick={leave} disabled={closing} className="rounded-full border border-white/35 bg-[#10282e]/90 px-5 py-2 font-semibold">Leave</button>
      </header>
      <div className="relative my-auto w-full max-w-[410px] py-4">
        <canvas ref={canvasRef} width={360} height={460} className="w-full touch-manipulation drop-shadow-2xl" aria-label="Coin pusher machine. Tap to drop a coin." onPointerDown={(event) => {
          const rect = event.currentTarget.getBoundingClientRect()
          const value = Math.max(0, Math.min(1, ((event.clientX - rect.left) / rect.width * 360 - 40) / 280))
          aimRef.current = value; setAim(value); drop(value)
        }} />
        <input type="range" min="0" max="100" value={aim * 100} aria-label="Aim coin" onChange={(event) => { const value = Number(event.target.value) / 100; aimRef.current = value; setAim(value) }} className="mx-auto block w-4/5 accent-[#80ead2]" />
        <button onClick={() => drop(aimRef.current)} className="mx-auto mt-4 flex min-h-14 w-4/5 items-center justify-center gap-2 rounded-2xl border-b-4 border-[#168c7d] bg-[#6ce0c6] text-lg font-black text-[#153b3c] active:translate-y-1 active:border-b-0">DROP <CurrencySprite currencyId={encounter.settings.cost.currencyType} width={24} height={24} /> {encounter.settings.cost.amount}</button>
        <div aria-live="polite" className="mt-3 min-h-6 text-center text-sm text-[#d6f5ea]">{failed.current ? <button className="underline" onClick={() => { failed.current = false; setMessage(''); void flush() }}>Retry · {message}</button> : message || (pending ? `${pending} queued` : 'Tap the machine or aim and drop')}</div>
      </div>
      {result && <RewardResultOverlay result={result} background={encounter.background} icon={encounter.icon} iconAlt={encounter.name} title="DONE" onClose={() => { void refreshUser(true); if (gridReturn) gridReturn.returnFromActivity(result.activitySuccess === true); else router.push('/game/explore') }} />}
    </main>
  )
}
