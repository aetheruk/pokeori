/** Fullscreen activities hold transient playfield state until their result is saved. */
export const ACTIVITY_STARTED_EVENT = 'pokeori:activity-started'
export const ACTIVITY_SETTLED_EVENT = 'pokeori:activity-settled'

export function isActivityUpdateDeferred(pathname: string) {
  return ['/game/games/', '/game/research/encounter', '/game/field-research', '/game/locations/encounter', '/game/battles/encounter'].some((prefix) => pathname.startsWith(prefix))
}
