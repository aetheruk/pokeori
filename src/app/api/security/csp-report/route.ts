import { getClientIp, rateLimit } from '@/utilities/rate-limiter'

export async function POST(request: Request) {
  const limit = await rateLimit(
    'csp-report',
    getClientIp(request.headers),
    20,
    60,
  )
  if (!limit.allowed) return new Response(null, { status: 429 })
  if (Number(request.headers.get('content-length') || 0) > 16_384) {
    return new Response(null, { status: 413 })
  }
  // Read with a hard limit even if Content-Length is absent or forged.
  const reader = request.body?.getReader()
  if (!reader) return new Response(null, { status: 400 })
  const chunks: Uint8Array[] = []
  let length = 0
  while (true) {
    const { value, done } = await reader.read()
    if (done) break
    length += value.byteLength
    if (length > 16_384) {
      await reader.cancel()
      return new Response(null, { status: 413 })
    }
    chunks.push(value)
  }
  try {
    const body = JSON.parse(new TextDecoder().decode(Buffer.concat(chunks)))
    const report = body['csp-report']
    const directive = String(report?.['effective-directive'] || '')
    if (!/^[a-z-]{1,60}$/.test(directive))
      return new Response(null, { status: 400 })
    // Avoid collecting URLs, query strings, snippets or user-supplied log text.
    console.warn(JSON.stringify({ event: 'csp-violation', directive }))
    return new Response(null, { status: 204 })
  } catch {
    return new Response(null, { status: 400 })
  }
}
