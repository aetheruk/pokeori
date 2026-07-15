/**
 * Logger utility with environment-aware logging
 *
 * Usage:
 * import { logger } from '@/utilities/logger'
 * logger.debug('Debug info', { data })
 * logger.error('Error occurred', error)
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error'

interface LoggerOptions {
  prefix?: string
}

class Logger {
  private isDevelopment: boolean

  constructor() {
    this.isDevelopment = process.env.NODE_ENV === 'development'
  }

  private log(level: LogLevel, ...args: any[]) {
    const prefix = `[${level.toUpperCase()}]`

    switch (level) {
      case 'debug':
        if (this.isDevelopment) {
          console.log(prefix, ...args)
        }
        break
      case 'info':
        console.info(prefix, ...args)
        break
      case 'warn':
        console.warn(prefix, ...args)
        break
      case 'error':
        console.error(prefix, ...args)
        break
    }
  }

  debug(...args: any[]) {
    this.log('debug', ...args)
  }

  info(...args: any[]) {
    this.log('info', ...args)
  }

  warn(...args: any[]) {
    this.log('warn', ...args)
  }

  error(...args: any[]) {
    this.log('error', ...args)
  }

  /**
   * Create a child logger with a custom prefix
   */
  child(prefix: string): Logger {
    const childLogger = new Logger()
    const originalLog = childLogger.log.bind(childLogger)
    childLogger.log = (level: LogLevel, ...args: any[]) => {
      originalLog(level, `[${prefix}]`, ...args)
    }
    return childLogger
  }
}

export const logger = new Logger()
