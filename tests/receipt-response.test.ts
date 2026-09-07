import { describe, expect, test } from 'bun:test'
import { decodeReceiptResponse, encodeReceiptResponse } from '../src/utilities/economy/receipt-response'

describe('durable receipt compression', () => {
  test('legacy and small responses retain their exact JSON result', async () => {
    const response = { win: true, reward: 3 }
    expect(await encodeReceiptResponse(response)).toEqual({ response })
    expect(await decodeReceiptResponse({ response })).toEqual(response)
  })
  test('large playback/state responses shrink and replay losslessly', async () => {
    const response = { frames: Array.from({ length: 2000 }, (_, i) => ({ x: i, y: i % 23 })), rewards: ['coin'] }
    const encoded = await encodeReceiptResponse(response)
    expect(encoded.responseEncoding).toBe('gzip-base64')
    expect(JSON.stringify(encoded).length).toBeLessThan(JSON.stringify(response).length * 0.8)
    expect(await decodeReceiptResponse(encoded)).toEqual(response)
  })
  test('corrupt or unknown encodings reject instead of allowing a second claim', async () => {
    await expect(decodeReceiptResponse({ response: { data: 'bad' }, responseEncoding: 'gzip-base64' })).rejects.toThrow()
    await expect(decodeReceiptResponse({ response: {}, responseEncoding: 'unknown' })).rejects.toThrow()
  })
  test('oversized compressible responses fail before an unreplayable receipt can commit', async () => {
    await expect(encodeReceiptResponse({state: 'x'.repeat(16 * 1024 * 1024)})).rejects.toThrow('replay size limit')
  })
})
