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
import type { CoinPusherBoard, CoinPusherFrame, CoinPusherFrameBody } from '@/utilities/research/coin-pusher-simulation'
import { COIN_PUSHER_DEPTH, COIN_PUSHER_WIDTH, getCoinPusherPusherY } from '@/utilities/research/coin-pusher-simulation'
import { completeGame } from '@/utilities/games/client-action-recovery'
import { advanceCoinPusherGame } from '../games/coin-pusher'

type Session = { board: CoinPusherBoard; totalCost: number; totalRewards: any }
type Request = { encounterId: string; revision: number; actionId: string; drops: number[] }
type QueuedDrop = { id: string; position: number; started: number; confirmedAt?: number }
type Playback = { frames: CoinPusherFrame[]; board: CoinPusherBoard; dropIds: string[]; rewards: unknown; lastFrameAt: number; progress: number; speed: number }

function point(body: Pick<CoinPusherFrameBody, 'x' | 'y' | 'shelf'>) {
  const depth = Math.max(0, Math.min(1, body.y / COIN_PUSHER_DEPTH))
  const scale = 0.78 + depth * 0.16
  return { x: 180 + (body.x - COIN_PUSHER_WIDTH / 2) * scale, y: (body.shelf === 0 ? 111 : 249) + depth * 91, scale }
}

function drawMachine(ctx: CanvasRenderingContext2D, board: CoinPusherBoard, frames: CoinPusherFrame[] | null, progress: number, sprites: Map<string, HTMLImageElement>, aim: number, ghosts: QueuedDrop[], now: number) {
  ctx.clearRect(0, 0, 360, 460)
  const gradient = (y: number, height: number, colors: string[]) => {
    const g = ctx.createLinearGradient(0, y, 0, y + height)
    colors.forEach((color, index) => g.addColorStop(index / (colors.length - 1), color))
    return g
  }
  const rounded = (x: number, y: number, width: number, height: number, radius: number, fill: string | CanvasGradient) => {
    ctx.fillStyle = fill; ctx.beginPath(); ctx.roundRect(x, y, width, height, radius); ctx.fill()
  }
  // Burgundy enamel, warm brass trim and a deep glass cabinet.
  ctx.save(); ctx.shadowColor = '#0009'; ctx.shadowBlur = 18; ctx.shadowOffsetY = 9
  rounded(9, 8, 342, 443, 22, gradient(8, 443, ['#b44842', '#6e252b', '#361c27']))
  ctx.restore()
  rounded(16, 15, 328, 429, 17, gradient(15, 429, ['#e2ad72', '#a45f3d', '#573329']))
  rounded(21, 20, 318, 419, 14, gradient(20, 419, ['#772b32', '#a8433c', '#54212d']))
  rounded(29, 27, 302, 44, 10, gradient(27, 44, ['#3d222b', '#201a25']))
  ctx.textAlign = 'center'; ctx.fillStyle = '#f9deb0'; ctx.font = 'bold 15px Georgia, serif'; ctx.letterSpacing = '2px'
  ctx.fillText('COIN PUSHER', 180, 49); ctx.letterSpacing = '0px'
  ctx.fillStyle = '#c8874d'; ctx.font = '8px sans-serif'; ctx.fillText('✦   GAME CORNER   ✦', 180, 61)
  rounded(27, 77, 306, 303, 8, gradient(77, 303, ['#101d29', '#243c41', '#101c27']))
  rounded(32, 82, 296, 293, 5, gradient(82, 293, ['#334e50', '#1d3034', '#111a23']))
  // Subtle reflections are painted beneath the moving mechanisms.
  ctx.fillStyle = '#fff1'; ctx.beginPath(); ctx.moveTo(43, 83); ctx.lineTo(80, 83); ctx.lineTo(35, 247); ctx.lineTo(35, 191); ctx.closePath(); ctx.fill()
  ctx.fillStyle = '#e6bd78'; ctx.fillRect(53, 88, 254, 2)
  const targetTick = frames?.length ? frames[0].tick + (frames[frames.length - 1].tick - frames[0].tick) * progress : 0
  let frameIndex = 0
  if (frames && frames.length > 1) {
    while (frameIndex < frames.length - 2 && frames[frameIndex + 1].tick <= targetTick) frameIndex++
  }
  const before = frames?.[frameIndex]
  const after = frames?.[frameIndex + 1]
  const fraction = before && after && after.tick > before.tick ? Math.max(0, Math.min(1, (targetTick - before.tick) / (after.tick - before.tick))) : 1
  const tick = before && after ? targetTick : board.tick
  const beforeBodies = before?.bodies || board.bodies
  const afterBodies = after?.bodies || board.bodies
  const oldById = new Map(beforeBodies.map((body) => [body.id, body]))
  const newById = new Map(afterBodies.map((body) => [body.id, body]))
  const drawBody = (body: CoinPusherFrameBody, x: number, y: number, scale: number, opacity = 1) => {
    const variant = Math.abs(body.id)
    const radius = (body.kind === 'coin' ? 12 : 15) * scale
    ctx.save(); ctx.globalAlpha = opacity; ctx.translate(x, y)
    ctx.fillStyle = '#09151380'; ctx.beginPath(); ctx.ellipse(1, 5, radius * 1.05, radius * .43, 0, 0, Math.PI * 2); ctx.fill()
    if (body.kind === 'coin') {
      ctx.rotate(((variant % 9) - 4) * .025)
      ctx.fillStyle = '#81501e'; ctx.beginPath(); ctx.ellipse(0, 2, radius, radius * .57, 0, 0, Math.PI * 2); ctx.fill()
      ctx.fillStyle = gradient(-radius, radius * 2, ['#fff2b7', '#edbb54', '#b9792e']); ctx.beginPath(); ctx.ellipse(0, 0, radius, radius * .53, 0, 0, Math.PI * 2); ctx.fill()
      ctx.strokeStyle = '#ae752f'; ctx.lineWidth = 1; ctx.beginPath(); ctx.ellipse(0, 0, radius * .72, radius * .36, 0, 0, Math.PI * 2); ctx.stroke()
      ctx.strokeStyle = '#fff1b0'; ctx.beginPath(); ctx.moveTo(-radius * .4, -radius * .19); ctx.lineTo(radius * .25, -radius * .25); ctx.stroke()
    } else {
      ctx.fillStyle = '#c3f9ecb8'; ctx.beginPath(); ctx.arc(0, -3, radius, 0, Math.PI * 2); ctx.fill()
      ctx.strokeStyle = '#f3fff5'; ctx.lineWidth = 1.5; ctx.stroke()
      const image = body.prizeId ? sprites.get(body.prizeId) : undefined
      if (image?.complete && image.naturalWidth) ctx.drawImage(image, -radius * .68, -radius * .68 - 3, radius * 1.36, radius * 1.36)
      ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.ellipse(-radius * .38, -radius * .45 - 3, 3, 1.7, -.6, 0, Math.PI * 2); ctx.fill()
    }
    ctx.restore()
  }
  const transfers: Array<{ body: CoinPusherFrameBody; x: number; y: number; scale: number; opacity: number }> = []
  for (const shelf of [0, 1] as const) {
    const top = shelf === 0 ? 100 : 238
    ctx.fillStyle = '#131d25'; ctx.beginPath(); ctx.moveTo(45, top); ctx.lineTo(315, top); ctx.lineTo(335, top + 107); ctx.lineTo(25, top + 107); ctx.closePath(); ctx.fill()
    ctx.fillStyle = gradient(top, 100, ['#577d76', '#a1c3a7', '#799c83']); ctx.beginPath(); ctx.moveTo(51, top + 5); ctx.lineTo(309, top + 5); ctx.lineTo(326, top + 99); ctx.lineTo(34, top + 99); ctx.closePath(); ctx.fill()
    const pusherY = getCoinPusherPusherY(tick, shelf)
    const pusherTop = point({ x: 160, y: pusherY - 10, shelf }).y
    const pusherBottom = point({ x: 160, y: pusherY + 10, shelf }).y
    const pusherHeight = pusherBottom - pusherTop
    const pusherLeft = point({ x: 0, y: pusherY, shelf }).x
    const pusherRight = point({ x: 320, y: pusherY, shelf }).x
    rounded(pusherLeft, pusherTop, pusherRight - pusherLeft, pusherHeight, 2, gradient(pusherTop, pusherHeight, ['#e5d8b4', '#9d8c70', '#574e45']))
    ctx.fillStyle = '#f8ebc8aa'; ctx.fillRect(pusherLeft + 3, pusherTop + 1, pusherRight - pusherLeft - 6, 2)
    const ids = new Set([...beforeBodies.filter((b) => b.shelf === shelf).map((b) => b.id), ...afterBodies.filter((b) => b.shelf === shelf).map((b) => b.id)])
    const sorted = [...ids].map((id) => ({ old: oldById.get(id), next: newById.get(id) })).sort((a, b) => (a.next?.y ?? a.old?.y ?? 0) - (b.next?.y ?? b.old?.y ?? 0))
    for (const { old, next } of sorted) {
      if (old && next && old.shelf !== next.shelf) {
        if (shelf !== old.shelf) continue
        const start = point(old); const edge = point({ ...old, y: COIN_PUSHER_DEPTH }); const end = point(next)
        const movingToEdge = fraction < .35
        const t = movingToEdge ? fraction / .35 : (fraction - .35) / .65
        const from = movingToEdge ? start : edge
        const to = movingToEdge ? edge : end
        transfers.push({ body: next, x: from.x + (to.x - from.x) * t, y: from.y + (to.y - from.y) * t, scale: from.scale + (to.scale - from.scale) * t, opacity: 1 })
      } else if (old && next) {
        const p = point({ ...next, x: old.x + (next.x - old.x) * fraction, y: old.y + (next.y - old.y) * fraction })
        drawBody(next, p.x, p.y, p.scale)
      } else if (next) {
        const p = point(next); drawBody(next, p.x, p.y - (1 - fraction) * 35, p.scale, fraction)
      } else if (old) {
        const p = point(old); transfers.push({ body: old, x: p.x, y: p.y + fraction * 28, scale: p.scale, opacity: 1 - fraction })
      }
    }
    ctx.fillStyle = gradient(top + 99, 15, ['#e6c699', '#a16f4d', '#49382f']); ctx.fillRect(28, top + 99, 304, 12)
    ctx.fillStyle = '#251d21'; ctx.fillRect(31, top + 111, 298, 6)
  }
  for (const item of transfers) drawBody(item.body, item.x, item.y, item.scale, item.opacity)
  for (const ghost of ghosts) {
    const p = point({ x: 20 + ghost.position * 280, y: 60, shelf: 0 })
    const fall = Math.min(1, Math.max(0, (now - ghost.started) / 350))
    const eased = fall * fall
    // A queued coin remains at the drop slot until its actual simulation
    // begins; it must never appear to touch or move the unpaid board.
    const fade = ghost.confirmedAt === undefined ? 1 : Math.max(0, 1 - (now - ghost.confirmedAt) / 170)
    drawBody({ id: -1, shelf: 0, kind: 'coin', x: 0, y: 0 }, p.x, 78 + 20 * eased, p.scale, .8 * fade)
  }
  // Moving drop guide and coin return.
  const guideX = point({ x: 20 + aim * 280, y: 60, shelf: 0 }).x
  ctx.strokeStyle = '#fff1c580'; ctx.setLineDash([3, 4]); ctx.beginPath(); ctx.moveTo(guideX, 94); ctx.lineTo(guideX, 108); ctx.stroke(); ctx.setLineDash([])
  ctx.fillStyle = '#f8d48f'; ctx.beginPath(); ctx.moveTo(guideX, 94); ctx.lineTo(guideX - 6, 85); ctx.lineTo(guideX + 6, 85); ctx.closePath(); ctx.fill()
  rounded(91, 389, 178, 33, 8, '#2b2024'); rounded(97, 393, 166, 23, 5, gradient(393, 23, ['#100f17', '#282027']))
  ctx.fillStyle = '#e2ba7b'; ctx.fillRect(106, 393, 148, 2)
  for (const x of [37, 323]) for (const y of [37, 430]) { ctx.fillStyle = '#f3d3a2'; ctx.beginPath(); ctx.arc(x, y, 2, 0, 7); ctx.fill() }
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
  const reducedMotion = useRef(false)
  const sprites = useRef(new Map<string, HTMLImageElement>())
  const playback = useRef<Playback | null>(null)
  const playbackQueue = useRef<Playback[]>([])
  const displayBoard = useRef<CoinPusherBoard | undefined>(initial?.board)
  const queue = useRef<QueuedDrop[]>([])
  const ghosts = useRef<QueuedDrop[]>([])
  const requestDrops = useRef<QueuedDrop[]>([])
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
    try {
      requestRef.current = JSON.parse(sessionStorage.getItem(storageKey) || 'null')
      requestDrops.current = (requestRef.current?.drops || []).map((position) => ({ id: crypto.randomUUID(), position, started: performance.now() }))
    } catch { requestRef.current = null }
  }, [encounter.settings.prizePool, storageKey])

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => { reducedMotion.current = preference.matches }
    update()
    preference.addEventListener('change', update)
    return () => preference.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    let frame = 0
    const draw = () => {
      const context = canvasRef.current?.getContext('2d')
      const board = displayBoard.current
      if (context && board) {
        const now = performance.now()
        let current = playback.current
        if (current) {
          // Slow the whole simulation slightly when the next segment is not
          // ready; the plate and coins always share the same playback tick.
          const elapsed = Math.max(0, Math.min(100, now - current.lastFrameAt))
          current.lastFrameAt = now
          const targetSpeed = playbackQueue.current.length ? 1 : .85
          current.speed += (targetSpeed - current.speed) * Math.min(1, elapsed / 350)
          current.progress = Math.min(1, current.progress + elapsed / 1500 * current.speed)
        }
        if (current && current.progress >= 1) {
          displayBoard.current = current.board
          if (current.rewards) {
            setMessage('Prize collected!')
            playSfx('good')
            void refreshUser()
          }
          current = playbackQueue.current.shift() || null
          if (current) {
            current.lastFrameAt = now
            for (const ghost of ghosts.current) if (current.dropIds.includes(ghost.id)) ghost.confirmedAt = now
          }
          playback.current = current
        }
        const progress = current && !reducedMotion.current ? current.progress : 1
        context.setTransform(2, 0, 0, 2, 0, 0)
        drawMachine(context, displayBoard.current || board, current?.frames || null, progress, sprites.current, aimRef.current, ghosts.current, now)
        ghosts.current = ghosts.current.filter((ghost) => ghost.confirmedAt === undefined || now - ghost.confirmedAt < 170)
      }
      frame = requestAnimationFrame(draw)
    }
    frame = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(frame)
  }, [playSfx, refreshUser])

  const flush = useCallback(async () => {
    if (busy.current || failed.current || !sessionRef.current) return false
    // Keep one advance ready before the current playback ends. This keeps
    // network and settlement latency out of the visible animation.
    if (playbackQueue.current.length > 0) return false
    busy.current = true
    const oldRequest = requestRef.current
    const selected = oldRequest ? requestDrops.current : queue.current.splice(0, 3)
    const drops = oldRequest ? oldRequest.drops : selected.map((drop) => drop.position)
    if (!oldRequest) requestDrops.current = selected
    setPending(queue.current.length + drops.length)
    const request = oldRequest || { encounterId: encounter.id, revision: sessionRef.current.board.revision, actionId: crypto.randomUUID(), drops }
    if (!drops.length && !requestRef.current && request.revision === 0) { busy.current = false; return true }
    requestRef.current = request
    try {
      try { sessionStorage.setItem(storageKey, JSON.stringify(request)) } catch { /* The server receipt still protects retries. */ }
      const response = await advanceCoinPusherGame(request)
      if (!response.success) {
        if (response.error === 'Not enough currency to drop a coin.') {
          const failedIds = new Set(selected.map((drop) => drop.id))
          ghosts.current = ghosts.current.filter((ghost) => !failedIds.has(ghost.id))
          requestDrops.current = []
          requestRef.current = null; try { sessionStorage.removeItem(storageKey) } catch {} setPending(queue.current.length); setMessage(response.error)
          return false
        }
        failed.current = true; setMessage(response.error); return false
      }
      if ('frames' in response && response.frames?.length) {
        const segment: Playback = { frames: response.frames, board: response.session.board, dropIds: response.replayed ? [] : selected.map((drop) => drop.id), rewards: response.rewards, lastFrameAt: performance.now(), progress: 0, speed: 1 }
        if (playback.current) playbackQueue.current.push(segment)
        else {
          playback.current = segment
          for (const ghost of ghosts.current) if (segment.dropIds.includes(ghost.id)) ghost.confirmedAt = segment.lastFrameAt
        }
      } else {
        displayBoard.current = response.session.board
        if (response.rewards) { setMessage('Prize collected!'); playSfx('good'); void refreshUser() }
        if (!response.replayed) {
          const confirmedIds = new Set(selected.map((drop) => drop.id))
          ghosts.current = ghosts.current.filter((ghost) => !confirmedIds.has(ghost.id))
        }
      }
      sessionRef.current = response.session
      setSession(response.session)
      if (response.replayed) queue.current.unshift(...selected)
      requestDrops.current = []
      requestRef.current = null
      try { sessionStorage.removeItem(storageKey) } catch {}
      setPending(queue.current.length)
      if (drops.length && !response.rewards) { setMessage(''); void refreshUser() }
      return true
    } catch {
      failed.current = true; setMessage('Connection interrupted. Tap retry to continue.')
      return false
    } finally { busy.current = false }
  }, [encounter.id, playSfx, refreshUser, storageKey])

  useEffect(() => {
    if (message !== 'Prize collected!') return
    const timer = window.setTimeout(() => setMessage(''), 2400)
    return () => window.clearTimeout(timer)
  }, [message])

  useEffect(() => {
    void flush()
    const timer = window.setInterval(() => { if (!closing && !result) void flush() }, 120)
    return () => window.clearInterval(timer)
  }, [flush, closing, result])

  const drop = (position: number) => {
    const available = (user?.currency as any)?.[encounter.settings.cost.currencyType] || 0
    const outstanding = queue.current.length + (requestRef.current?.drops.length || 0)
    if (available < encounter.settings.cost.amount * (outstanding + 1)) { setMessage('Not enough currency to drop a coin.'); return }
    if (queue.current.length >= 12 || closing || result) return
    playSfx('select')
    const queued = { id: crypto.randomUUID(), position, started: performance.now() }
    queue.current.push(queued); ghosts.current.push(queued); setPending(outstanding + 1); void flush()
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
    <main className="relative flex min-h-dvh flex-col items-center overflow-hidden bg-[#17252b] px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(1rem,env(safe-area-inset-top))] text-white">
      <div className="absolute inset-0 bg-cover bg-center opacity-25" style={{ backgroundImage: `linear-gradient(#17252b88, #101a22cc), url(${encounter.background})` }} />
      <header className="relative flex w-full max-w-md items-center justify-between gap-4">
        <div className="flex items-center gap-2 rounded-full bg-[#10282e]/90 px-3 py-2 font-bold"><CurrencySprite currencyId={encounter.settings.cost.currencyType} width={24} height={24} /><span>{(user?.currency as any)?.[encounter.settings.cost.currencyType] || 0}</span></div>
        <button onClick={leave} disabled={closing} className="rounded-full border border-white/35 bg-[#10282e]/90 px-5 py-2 font-semibold">Leave</button>
      </header>
      <div className="relative my-auto w-full max-w-[410px] py-3">
        <canvas ref={canvasRef} width={720} height={920} className="w-full touch-manipulation" aria-label="Coin pusher machine. Tap to drop a coin." onPointerDown={(event) => {
          const rect = event.currentTarget.getBoundingClientRect()
          const left = point({ x: 20, y: 60, shelf: 0 }).x
          const right = point({ x: 300, y: 60, shelf: 0 }).x
          const value = Math.max(0, Math.min(1, ((event.clientX - rect.left) / rect.width * 360 - left) / (right - left)))
          aimRef.current = value; setAim(value); drop(value)
        }} />
        <div className="relative mx-auto mt-1 h-12 w-[82%] rounded-full focus-within:ring-2 focus-within:ring-[#f9d99e]">
          <div className="absolute inset-x-3 top-5 h-3 rounded-full border border-[#916741] bg-[#211a20] shadow-inner" />
          <div className="absolute inset-x-5 top-[25px] h-px bg-[#f5d59b]/35" />
          <div className="pointer-events-none absolute top-2 h-9 w-9 -translate-x-1/2 rounded-full border-2 border-[#ffdc98] bg-gradient-to-b from-[#fce2a2] via-[#d7a656] to-[#98652f] shadow-[0_3px_6px_#0009]" style={{ left: `calc(12px + (100% - 24px) * ${aim})` }}>
            <div className="absolute inset-[5px] rounded-full border border-[#aa793c]/70" />
          </div>
          <input type="range" min="0" max="100" value={aim * 100} aria-label="Aim coin" onChange={(event) => { const value = Number(event.target.value) / 100; aimRef.current = value; setAim(value) }} className="absolute inset-0 h-full w-full cursor-pointer opacity-0" />
        </div>
        <button onClick={() => drop(aimRef.current)} className="mx-auto mt-2 flex min-h-14 w-4/5 items-center justify-center gap-2 rounded-2xl border border-[#f6d59a] bg-gradient-to-b from-[#f6d895] to-[#dca75a] text-lg font-bold text-[#4a2925] shadow-[0_4px_0_#82502e,0_8px_15px_#0005] transition-transform active:translate-y-1 active:shadow-[0_1px_0_#82502e] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">Drop <CurrencySprite currencyId={encounter.settings.cost.currencyType} width={24} height={24} /> {encounter.settings.cost.amount}</button>
        <div aria-live="polite" className="mt-3 min-h-6 text-center text-sm text-[#f6ddb7]">{failed.current ? <button className="underline" onClick={() => { failed.current = false; setMessage(''); void flush() }}>Retry · {message}</button> : message || (pending ? `${pending} queued` : '')}</div>
      </div>
      {result && <RewardResultOverlay result={result} background={encounter.background} icon={encounter.icon} iconAlt={encounter.name} title="DONE" onClose={() => { void refreshUser(true); if (gridReturn) gridReturn.returnFromActivity(result.activitySuccess === true); else router.push('/game/explore') }} />}
    </main>
  )
}
