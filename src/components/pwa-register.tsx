'use client'

import { useEffect } from 'react'

export function PwaRegister() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(
          (registration) => {
            if (process.env.NODE_ENV === 'development') {
              console.log('Service Worker registration successful with scope: ', registration.scope)
            }
          },
          (err) => {
            if (process.env.NODE_ENV === 'development') {
              console.log('Service Worker registration failed: ', err)
            }
          },
        )
      })
    }
  }, [])

  return null
}
