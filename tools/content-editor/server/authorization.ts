import 'server-only'

/**
 * The content editor is a local authoring tool, not a player-facing route.
 * Requiring an explicit opt-in keeps its file-writing actions inert when a
 * developer imports them from the wrong process or environment.
 */
export async function requireDevAdmin() {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('The local content editor is disabled in production')
  }

  if (process.env.POKEORI_CONTENT_EDITOR !== '1') {
    throw new Error('The local content editor is not enabled')
  }
}
