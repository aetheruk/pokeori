'use client'

import { Download, Settings, Trash2, Volume2, VolumeX } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ResponsivePanel } from '@/components/ui/responsive-panel'
import { useAudio } from '@/context/AudioContext'
import {
  type DownloadImage,
  downloadGameImages,
  IMAGE_CACHE_NAME,
  imageCacheKey,
} from '@/utilities/image-cache'

export function TrainerSettings() {
  const { isAudioEnabled, toggleAudioEnabled } = useAudio()
  const [open, setOpen] = useState(false)
  const [images, setImages] = useState<DownloadImage[]>([])
  const [completed, setCompleted] = useState(0)
  const [busy, setBusy] = useState(false)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [supported, setSupported] = useState(false)
  const download = useRef<AbortController | null>(null)

  useEffect(() => () => download.current?.abort(), [])

  useEffect(() => {
    if (!open || download.current) return
    const request = new AbortController()
    setLoading(true)
    setImages([])
    setCompleted(0)
    setMessage('')
    const available =
      'caches' in window &&
      'serviceWorker' in navigator &&
      window.isSecureContext
    setSupported(available)
    if (!available) {
      setLoading(false)
      return
    }
    void (async () => {
      try {
        const response = await fetch('/api/game-images', {
          cache: 'no-store',
          signal: request.signal,
        })
        if (!response.ok)
          throw new Error(
            'Could not load the image list. Reopen settings to try again.',
          )
        const manifest: DownloadImage[] = await response.json()
        const cache = await caches.open(IMAGE_CACHE_NAME)
        const keys = new Set((await cache.keys()).map((key) => key.url))
        if (request.signal.aborted) return
        setImages(manifest)
        setCompleted(
          manifest.filter((image) =>
            keys.has(new URL(imageCacheKey(image), location.origin).href),
          ).length,
        )
      } catch (error) {
        if (!request.signal.aborted)
          setMessage(
            error instanceof Error
              ? error.message
              : 'Image storage is unavailable.',
          )
      } finally {
        if (!request.signal.aborted) setLoading(false)
      }
    })()
    return () => request.abort()
  }, [open])

  const start = async () => {
    if (download.current) return
    const controller = new AbortController()
    download.current = controller
    setBusy(true)
    setMessage(
      'Keep the app open while images download. You can cancel and resume later.',
    )
    try {
      // Best effort: refusal does not prevent downloading.
      void navigator.storage?.persist?.().catch(() => false)
      await downloadGameImages(images, controller.signal, setCompleted)
      setMessage('All game images are downloaded on this device.')
    } catch (error) {
      setMessage(
        controller.signal.aborted
          ? 'Download paused. Saved images will be reused when you resume.'
          : error instanceof DOMException && error.name === 'QuotaExceededError'
            ? 'There is not enough storage. Free some space, then resume the download.'
            : error instanceof Error
              ? error.message
              : 'Download interrupted. Please try again.',
      )
    } finally {
      download.current = null
      setBusy(false)
    }
  }

  const remove = async () => {
    setBusy(true)
    try {
      await caches.delete(IMAGE_CACHE_NAME)
      setCompleted(0)
      setMessage('Downloaded images removed. Images will load as you play.')
    } catch {
      setMessage('Could not remove downloaded images. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  const megabytes = useMemo(() => (
    images.reduce((total, image) => total + image.bytes, 0) / 1024 / 1024
  ).toFixed(1), [images])
  const ready = images.length > 0 && completed === images.length

  return (
    <ResponsivePanel
      open={open}
      onOpenChange={setOpen}
      title="Settings"
      description="Sound and image storage for this device."
      className="flex flex-col"
      headerClassName="shrink-0"
      trigger={
        <button
          type="button"
          aria-label="Trainer settings"
          title="Settings"
          className="game-focus-ring absolute left-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-md border border-game-border bg-game-surface/85 text-game-ink backdrop-blur-md transition-colors hover:bg-game-surface-raised"
        >
          <Settings className="h-5 w-5" aria-hidden="true" />
        </button>
      }
    >
      <div className="min-h-0 space-y-6 overflow-y-auto p-4 pb-8 text-game-ink">
        <section className="space-y-3 rounded-lg border border-game-border bg-game-surface p-4">
          <h3 className="font-semibold">Sound</h3>
          <Button
            variant="outline"
            onClick={toggleAudioEnabled}
            aria-pressed={isAudioEnabled}
            className="min-h-11 w-full justify-between"
          >
            <span className="flex items-center gap-2">
              {isAudioEnabled ? (
                <Volume2 className="h-4 w-4" />
              ) : (
                <VolumeX className="h-4 w-4" />
              )}
              Game audio
            </span>
            <span>{isAudioEnabled ? 'On' : 'Off'}</span>
          </Button>
        </section>
        <section className="space-y-3 rounded-lg border border-game-border bg-game-surface p-4">
          <h3 className="font-semibold">Game images</h3>
          <p className="text-sm text-game-muted">
            Download the bundled artwork ahead of time for faster loading.
            Unchanged images stay saved through app updates.
          </p>
          {!supported && !loading ? (
            <p className="text-sm">
              Image downloads are unavailable in this browser.
            </p>
          ) : (
            <>
              <p className="text-sm">
                {loading
                  ? 'Checking images…'
                  : `${images.length.toLocaleString()} images · ${megabytes} MB total`}
              </p>
              <div
                role="progressbar"
                aria-label="Downloaded images"
                aria-valuemin={0}
                aria-valuemax={images.length || 1}
                aria-valuenow={completed}
                className="h-3 w-full overflow-hidden rounded-md border border-game-border bg-game-canvas"
              >
                <div
                  className="h-full bg-game-ochre"
                  style={{
                    width: `${images.length ? (completed / images.length) * 100 : 0}%`,
                  }}
                />
              </div>
              <p className="text-sm text-game-muted">
                {completed.toLocaleString()} of {images.length.toLocaleString()}{' '}
                saved
              </p>
              <div className="flex flex-wrap gap-2">
                <Button
                  disabled={loading || busy || !images.length || ready}
                  onClick={start}
                  className="min-h-11"
                >
                  <Download className="mr-2 h-4 w-4" />
                  {ready
                    ? 'Images downloaded'
                    : completed > 0
                      ? 'Resume download'
                      : 'Download images'}
                </Button>
                {busy && download.current && (
                  <Button
                    variant="outline"
                    onClick={() => download.current?.abort()}
                    className="min-h-11"
                  >
                    Cancel download
                  </Button>
                )}
                {!busy && completed > 0 && (
                  <Button
                    variant="outline"
                    onClick={remove}
                    className="min-h-11"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Remove downloads
                  </Button>
                )}
              </div>
            </>
          )}
          <p role="status" className="text-sm text-game-muted">
            {message}
          </p>
          <p className="text-xs text-game-muted">
            Online play is still required. External card artwork is loaded as
            needed. Your browser may clear saved images when storage is low.
          </p>
        </section>
      </div>
    </ResponsivePanel>
  )
}
