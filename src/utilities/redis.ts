import Redis from 'ioredis'

const getRedisUrl = () => {
  if (process.env.REDIS_URL) return process.env.REDIS_URL
  // Fallback for local dev if not set (default to localhost:6379)
  return undefined
}

class RedisWrapper {
  private client!: Redis

constructor(url?: string) {
    if (url) {
      if (url.startsWith('rediss://')) {
        this.client = new Redis(url, {
          tls: {
            rejectUnauthorized: true, // Enforce TLS certificate validation
          },
        })
      } else {
        this.client = new Redis(url)
      }
    } else {
      this.client = new Redis()
    }

    // Suppress unhandled error events to prevent build crashes
    this.client.on('error', (err) => {
      // Only log if not during build or if critical?
      // For now, log to stderr but don't crash
      console.error('Redis Client Error:', err.message)
    })
  }

  async get<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key)
    if (!data) return null
    try {
      return JSON.parse(data) as T
    } catch {
      return data as unknown as T
    }
  }

  async set<T = unknown>(
    key: string,
    value: T,
    options?: { ex?: number; nx?: boolean },
  ): Promise<string | null> {
    const stringValue = typeof value === 'object' ? JSON.stringify(value) : String(value)

    if (options?.ex && options?.nx) {
      return await this.client.set(key, stringValue, 'EX', options.ex, 'NX')
    }
    if (options?.ex) {
      return await this.client.set(key, stringValue, 'EX', options.ex)
    }
    if (options?.nx) {
      return await this.client.set(key, stringValue, 'NX')
    }
    return await this.client.set(key, stringValue)
  }

  async del(key: string): Promise<number> {
    return await this.client.del(key)
  }

  async lpush(key: string, ...elements: (string | number | Buffer)[]): Promise<number> {
    return await this.client.lpush(key, ...elements)
  }

  async rpush(key: string, ...elements: (string | number | Buffer)[]): Promise<number> {
    return await this.client.rpush(key, ...elements)
  }

  async expire(key: string, seconds: number): Promise<number> {
    return await this.client.expire(key, seconds)
  }

  async sadd(key: string, ...members: (string | number | Buffer)[]): Promise<number> {
    return await this.client.sadd(key, ...members)
  }

  async srem(key: string, ...members: (string | number | Buffer)[]): Promise<number> {
    return await this.client.srem(key, ...members)
  }

  async smembers(key: string): Promise<string[]> {
    return await this.client.smembers(key)
  }

  async sismember(key: string, member: string | number | Buffer): Promise<number> {
    return await this.client.sismember(key, member)
  }

  async incr(key: string): Promise<number> {
    return await this.client.incr(key)
  }

  async decr(key: string): Promise<number> {
    return await this.client.decr(key)
  }

  async lpop(key: string): Promise<string | null> {
    return await this.client.lpop(key)
  }

  async deleteIfValue(key: string, expectedValue: string): Promise<number> {
    const script =
      "if redis.call('GET', KEYS[1]) == ARGV[1] then return redis.call('DEL', KEYS[1]) else return 0 end"
    const result = await this.client.eval(script, 1, key, expectedValue)
    return typeof result === 'number' ? result : Number(result || 0)
  }
}

export const redis = new RedisWrapper(getRedisUrl())
