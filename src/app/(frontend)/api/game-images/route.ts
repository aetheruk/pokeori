import { getGameImages } from '@/utilities/image-manifest'

export const dynamic = 'force-dynamic'

export async function GET() {
  return Response.json(await getGameImages(), {
    headers: { 'Cache-Control': 'no-store' },
  })
}
