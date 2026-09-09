export const notificationServiceWorker = `
self.addEventListener('push', event => {
  let message = {}
  try {
    const data = event.data ? event.data.json() : {}
    if (data && typeof data === 'object') message = data
  } catch {}
  const localUrl = value => {
    try {
      const url = new URL(value, self.location.origin)
      return url.origin === self.location.origin ? url.href : null
    } catch { return null }
  }
  // Always display received pushes, including malformed payloads (required by Safari).
  event.waitUntil(self.registration.showNotification(message.title || 'Pokeori', {
    body: message.body || 'Your field journal has an update.',
    icon: localUrl(message.icon || '/app-icon.avif') || '/app-icon.avif',
    tag: message.tag || 'pokeori-update',
    data: { url: localUrl(message.url || '/game/explore') || '/game/explore' },
  }))
})
self.addEventListener('notificationclick', event => {
  event.notification.close()
  event.waitUntil((async () => {
    const target = new URL(event.notification.data?.url || '/game/explore', self.location.origin)
    if (target.origin !== self.location.origin || !target.pathname.startsWith('/game')) return
    const windows = await clients.matchAll({ type: 'window', includeUncontrolled: true })
    // Do not navigate a running battle away to display an alert.
    const existing = windows.find(client => client.url === target.href)
    if (existing) return existing.focus()
    return clients.openWindow(target.href)
  })())
})
`
