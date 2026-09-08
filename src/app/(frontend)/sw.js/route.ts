import { APP_VERSION } from '@/utilities/app-version'
import { createImageServiceWorker } from '@/utilities/image-service-worker'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export function GET() {
  return new Response(createImageServiceWorker(APP_VERSION), {
    headers: {
      'Cache-Control': 'no-store, max-age=0, must-revalidate',
      'Content-Type': 'application/javascript; charset=utf-8',
      'Service-Worker-Allowed': '/',
    },
  })
}
