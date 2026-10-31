export function decodePushPublicKey(publicKey: string) {
  const encoded = publicKey.replace(/-/g, '+').replace(/_/g, '/')
  return Uint8Array.from(atob(encoded), char => char.charCodeAt(0))
}

export function pushSubscriptionUsesPublicKey(applicationServerKey: ArrayBuffer | null, publicKey: string) {
  if (!applicationServerKey) return false
  const existingBytes = new Uint8Array(applicationServerKey)
  const expectedBytes = decodePushPublicKey(publicKey)
  return existingBytes.length === expectedBytes.length && existingBytes.every((byte, index) => byte === expectedBytes[index])
}
