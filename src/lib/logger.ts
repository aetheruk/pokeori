/**
 * Development-only logger utility
 * Prevents console output from appearing in production builds
 */

const isDev = process.env.NODE_ENV === 'development'

export const logger = {
  /**
   * Log error messages (development only)
   */
  error: (message: string, ...args: unknown[]) => {
    if (isDev) {
      console.error(message, ...args)
    }
    // In production, you could send errors to a monitoring service like Sentry
    // Example: Sentry.captureException(new Error(message))
  },

  /**
   * Log warning messages (development only)
   */
  warn: (message: string, ...args: unknown[]) => {
    if (isDev) {
      console.warn(message, ...args)
    }
  },

  /**
   * Log info messages (development only)
   */
  info: (message: string, ...args: unknown[]) => {
    if (isDev) {
      console.info(message, ...args)
    }
  },

  /**
   * Log debug messages (development only)
   */
  debug: (message: string, ...args: unknown[]) => {
    if (isDev) {
      console.debug(message, ...args)
    }
  },

  /**
   * Log general messages (development only)
   */
  log: (message: string, ...args: unknown[]) => {
    if (isDev) {
      console.log(message, ...args)
    }
  },
}
