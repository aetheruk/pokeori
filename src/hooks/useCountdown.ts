import { useState, useEffect } from 'react'

export function useCountdown(targetDate: string | number | Date | null) {
  const [timeLeft, setTimeLeft] = useState<number>(0)

  useEffect(() => {
    if (!targetDate) {
      setTimeLeft(0)
      return
    }

    const target = new Date(targetDate).getTime()

    const calculate = () => {
      const now = Date.now()
      const diff = target - now
      return Math.max(0, diff)
    }

    setTimeLeft(calculate())

    const interval = setInterval(() => {
      const left = calculate()
      setTimeLeft(left)
      if (left <= 0) clearInterval(interval)
    }, 1000)

    return () => clearInterval(interval)
  }, [targetDate])

  const format = (ms: number) => {
    if (ms <= 0) return '00:00:00'
    const seconds = Math.floor((ms / 1000) % 60)
    const minutes = Math.floor((ms / (1000 * 60)) % 60)
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24)
    const days = Math.floor(ms / (1000 * 60 * 60 * 24))

    const p = (n: number) => n.toString().padStart(2, '0')
    if (days > 0) return `${days}d ${p(hours)}:${p(minutes)}:${p(seconds)}`
    return `${p(hours)}:${p(minutes)}:${p(seconds)}`
  }

  return { timeLeft, formatted: format(timeLeft), isFinished: timeLeft <= 0 && !!targetDate }
}
