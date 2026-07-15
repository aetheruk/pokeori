import { useState, useEffect, useRef } from 'react'

/**
 * A hook to persist state to localStorage with support for hydration.
 *
 * @param key The localStorage key
 * @param defaultValue The default value if nothing is in storage
 * @returns [state, setState]
 */
export function usePersistentState<T>(
  key: string,
  defaultValue: T,
): [T, (value: T) => void, boolean] {
  // Initialize with default value to match server-side rendering
  const [state, setState] = useState<T>(defaultValue)
  const [isLoaded, setIsLoaded] = useState(false)

  // One-time effect to load from localStorage on mount
  useEffect(() => {
    // Determine the stored value
    let valueToUse = defaultValue
    try {
      const saved = localStorage.getItem(key)
      if (saved !== null) {
        // Attempt to parse JSON, or fallback to string if simple string
        try {
          valueToUse = JSON.parse(saved)
        } catch {
          valueToUse = saved as unknown as T
        }
      }
    } catch (e) {
      if (process.env.NODE_ENV === 'development') console.warn('Error reading from localStorage', e)
    }

    // Update state to reflect storage
    setState(valueToUse)
    setIsLoaded(true)
  }, [key, defaultValue])

  // Wrapper to update both state and localStorage
  const setPersistentState = (newValue: T) => {
    try {
      const valueToStore = typeof newValue === 'string' ? newValue : JSON.stringify(newValue)
      localStorage.setItem(key, valueToStore)
    } catch (e) {
      if (process.env.NODE_ENV === 'development') console.warn('Error writing to localStorage', e)
    }
    setState(newValue)
  }

  return [state, setPersistentState, isLoaded]
}
