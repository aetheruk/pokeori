import Redis from 'ioredis'

const getRedisUrl = () => {
  if (process.env.REDIS_URL) return process.env.REDIS_URL
  // Fallback for local dev if not set (default to localhost:6379)
  return undefined
}

class RedisWrapper {
  private client?: Redis
  private readonly url?: string

  constructor(url?: string) {
    this.url = url
  }

  private getClient(): Redis {
    if (this.client) return this.client

    if (this.url?.startsWith('rediss://')) {
      this.client = new Redis(this.url, {
        tls: {
          rejectUnauthorized: true, // Enforce TLS certificate validation
        },
      })
    } else if (this.url) {
      this.client = new Redis(this.url)
    } else {
      this.client = new Redis()
    }

    // Create the connection only when Redis is actually used. This keeps
    // Next's build/static-generation process independent of a live Redis host.
    this.client.on('error', (err) => {
      // For now, log to stderr but don't crash
      console.error('Redis Client Error:', err.message)
    })

    return this.client
  }

  async get<T>(key: string): Promise<T | null> {
    const data = await this.getClient().get(key)
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
      return await this.getClient().set(key, stringValue, 'EX', options.ex, 'NX')
    }
    if (options?.ex) {
      return await this.getClient().set(key, stringValue, 'EX', options.ex)
    }
    if (options?.nx) {
      return await this.getClient().set(key, stringValue, 'NX')
    }
    return await this.getClient().set(key, stringValue)
  }

  async del(key: string): Promise<number> {
    return await this.getClient().del(key)
  }

  async lpush(key: string, ...elements: (string | number | Buffer)[]): Promise<number> {
    return await this.getClient().lpush(key, ...elements)
  }

  async rpush(key: string, ...elements: (string | number | Buffer)[]): Promise<number> {
    return await this.getClient().rpush(key, ...elements)
  }

  async expire(key: string, seconds: number): Promise<number> {
    return await this.getClient().expire(key, seconds)
  }

  async sadd(key: string, ...members: (string | number | Buffer)[]): Promise<number> {
    return await this.getClient().sadd(key, ...members)
  }

  async srem(key: string, ...members: (string | number | Buffer)[]): Promise<number> {
    return await this.getClient().srem(key, ...members)
  }

  async smembers(key: string): Promise<string[]> {
    return await this.getClient().smembers(key)
  }

  async sismember(key: string, member: string | number | Buffer): Promise<number> {
    return await this.getClient().sismember(key, member)
  }

  async incr(key: string): Promise<number> {
    return await this.getClient().incr(key)
  }

  async decr(key: string): Promise<number> {
    return await this.getClient().decr(key)
  }

  async lpop(key: string): Promise<string | null> {
    return await this.getClient().lpop(key)
  }

  async deleteIfValue(key: string, expectedValue: string): Promise<number> {
    const script =
      "if redis.call('GET', KEYS[1]) == ARGV[1] then return redis.call('DEL', KEYS[1]) else return 0 end"
    const result = await this.getClient().eval(script, 1, key, expectedValue)
    return typeof result === 'number' ? result : Number(result || 0)
  }
}

export const redis = new RedisWrapper(getRedisUrl())
