import { gzip, gunzip } from 'node:zlib'
import { promisify } from 'node:util'

const compress = promisify(gzip)
const decompress = promisify(gunzip)
const MAX_RESPONSE_BYTES = 16 * 1024 * 1024

/** Lossless storage only: the key and original committed result never expire. */
export async function encodeReceiptResponse(response: unknown) {
  const json = JSON.stringify(response)
  if (json !== undefined && Buffer.byteLength(json) > MAX_RESPONSE_BYTES) {
    throw new Error('Economic receipt response exceeds replay size limit')
  }
  if (json === undefined || Buffer.byteLength(json) < 8192) return { response }
  const compressed = (await compress(json)).toString('base64')
  if (compressed.length >= Buffer.byteLength(json) * 0.8) return { response }
  return { response: { data: compressed }, responseEncoding: 'gzip-base64' as const }
}

export async function decodeReceiptResponse(receipt: { response: unknown; responseEncoding?: string | null }) {
  if (!receipt.responseEncoding) return receipt.response
  if (receipt.responseEncoding !== 'gzip-base64' || !receipt.response || typeof receipt.response !== 'object' ||
    !('data' in receipt.response) || typeof receipt.response.data !== 'string') {
    throw new Error('Unsupported economic receipt encoding')
  }
  // A corrupt receipt must fail closed; it must never look like an unused key.
  const json = await decompress(Buffer.from(receipt.response.data, 'base64'), { maxOutputLength: MAX_RESPONSE_BYTES })
  return JSON.parse(json.toString('utf8')) as unknown
}
